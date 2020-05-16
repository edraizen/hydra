# Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved
import logging
from pathlib import Path
from typing import Any, Dict, List, Optional, Sequence

from hydra.core.config_loader import ConfigLoader
from hydra.core.hydra_config import HydraConfig
from hydra.core.singleton import Singleton
from hydra.core.utils import (
    JobReturn,
    configure_log,
    filter_overrides,
    run_job,
    setup_globals,
)
from hydra.plugins.launcher import Launcher
from hydra.types import TaskFunction
import dask
import dask_jobqueue
from joblib import Parallel, delayed
from omegaconf import DictConfig, open_dict

log = logging.getLogger(__name__)

clusters = {
    "pbs": dask_jobqueue.PBSCluster,
    "sge": dask_jobqueue.SGECluster,
    "lsf": dask_jobqueue.LSFCluster,
    "slurm": dask_jobqueue.SlurmCluster
}


class DaskLauncher(Launcher):
    def __init__(self, **kwargs: Any) -> None:
        """Joblib Launcher

        Launches parallel jobs using Dask-Jobqueue. For details, refer to:
        https://jobqueue.dask.org/en/latest/index.html
        """
        self.config: Optional[DictConfig] = None
        self.config_loader: Optional[ConfigLoader] = None
        self.task_function: Optional[TaskFunction] = None

        self.joblib = kwargs

    def setup(
        self,
        config: DictConfig,
        config_loader: ConfigLoader,
        task_function: TaskFunction,
    ) -> None:
        self.config = config
        self.config_loader = config_loader
        self.task_function = task_function

    def launch(
        self, job_overrides: Sequence[Sequence[str]], initial_job_idx: int
    ) -> Sequence[JobReturn]:
        """
        :param job_overrides: a List of List<String>, where each inner list is the arguments for one job run.
        :param initial_job_idx: Initial job idx in batch.
        :return: an array of return values from run_job with indexes corresponding to the input list indexes.
        """
        setup_globals()
        assert self.config is not None
        assert self.config_loader is not None
        assert self.task_function is not None

        configure_log(self.config.hydra.hydra_logging, self.config.hydra.verbose)
        sweep_dir = Path(str(self.config.hydra.sweep.dir))
        sweep_dir.mkdir(parents=True, exist_ok=True)

        joblib_cfg = self.joblib
        joblib_cfg["backend"] = "dask"

        dask_cfg = self.joblib.pop("jobqueue", None)

        if dask_cfg is None:
            raise RuntimeError("'jobqueue' must be present in config file")

        dask.config.update(dask.config.config, {'jobqueue':dask_cfg}, priority="old")
        cluster_type = list(dask_cfg.keys())[0]

        cluster = clusters[cluster_type]()
        cluster.scale(joblib_cfg["n_jobs"])

        log.info(
            "Joblib.Parallel({}) is launching {} jobs on cluster {}({})".format(
                ",".join([f"{k}={v}" for k, v in joblib_cfg.items()]),
                len(job_overrides),
                cluster.__class__.__name__,
                ",".join([f"{k}={v}" for k, v in dask_cfg.items()]),
            )
        )
        log.info("Launching jobs, sweep output dir : {}".format(sweep_dir))
        for idx, overrides in enumerate(job_overrides):
            log.info("\t#{} : {}".format(idx, " ".join(filter_overrides(overrides))))

        singleton_state = Singleton.get_state()

        runs = Parallel(**joblib_cfg)(
            delayed(execute_job)(
                initial_job_idx + idx,
                overrides,
                self.config_loader,
                self.config,
                self.task_function,
                singleton_state,
            )
            for idx, overrides in enumerate(job_overrides)
        )

        assert isinstance(runs, List)
        for run in runs:
            assert isinstance(run, JobReturn)
        return runs


def execute_job(
    idx: int,
    overrides: Sequence[str],
    config_loader: ConfigLoader,
    config: DictConfig,
    task_function: TaskFunction,
    singleton_state: Dict[Any, Any],
) -> JobReturn:
    """Calls `run_job` in parallel
    """
    setup_globals()
    Singleton.set_state(singleton_state)

    sweep_config = config_loader.load_sweep_config(config, list(overrides))
    with open_dict(sweep_config):
        sweep_config.hydra.job.id = "{}_{}".format(sweep_config.hydra.job.name, idx)
        sweep_config.hydra.job.num = idx
    HydraConfig.instance().set_config(sweep_config)

    ret = run_job(
        config=sweep_config,
        task_function=task_function,
        job_dir_key="hydra.sweep.dir",
        job_subdir_key="hydra.sweep.subdir",
    )

    return ret
