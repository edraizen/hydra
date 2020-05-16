# Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved
from dataclasses import dataclass
from typing import Optional, Dict, Union

from hydra.core.config_store import ConfigStore
from hydra.types import ObjectConf


@dataclass
class DaskConf:
    # maximum number of concurrently running jobs. if -1, all CPUs are used
    n_jobs: int = 10

    # allows to hard-code backend, otherwise inferred based on prefer and require
    backend: Optional[str] = None

    # processes or threads, soft hint to choose backend
    prefer: str = "processes"

    # null or sharedmem, sharedmem will select thread-based backend
    require: Optional[str] = None

    # if greater than zero, prints progress messages
    verbose: int = 0

    # timeout limit for each task
    timeout: Optional[int] = None

    # number of batches to be pre-dispatched
    pre_dispatch: str = "2*n_jobs"

    # number of atomic tasks to dispatch at once to each worker
    batch_size: str = "auto"

    # folder used for memmapping large arrays for sharing memory with workers
    temp_folder: Optional[str] = None

    # thresholds size of arrays that triggers automated memmapping
    max_nbytes: Optional[str] = None

    # memmapping mode for numpy arrays passed to workers
    mmap_mode: str = "r"

    #Dask Jobqueue config
    jobqueue: Dict[Dict[Union[str, int, float]]]


@dataclass
class JobLibLauncherConf(ObjectConf):
    cls: str = "hydra_plugins.hydra_dask_launcher.dask_launcher.DaskLauncher"
    params: DaskConf = DaskConf()


ConfigStore.instance().store(
    group="hydra/launcher",
    name="dask",
    node=DaskLauncherConf,
    provider="dask_launcher",
)
