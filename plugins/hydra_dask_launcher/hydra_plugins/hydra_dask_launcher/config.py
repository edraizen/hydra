# Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved
from dataclasses import dataclass
from typing import Optional, Dict, List, Union

from hydra.core.config_store import ConfigStore
from hydra.types import ObjectConf


@dataclass
class JoblibConf:
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

@dataclass
class DaskConf:
    #Scheduler type
    scheduler: str = None
    #Destination queue for each worker job. Passed to #SBATCH -p option.
    queue: str = None

    #Accounting string associated with each worker job. Passed to #SBATCH -A option.
    project: str = None

    #Total number of cores per job
    cores: int = 1

    #Total amount of memory per job
    memory: str = "12 GB"

    #Cut the job up into this many processes. Good for GIL workloads or for nodes
    # with many cores. By default, process ~= sqrt(cores) so that the number of
    #processes and the number of threads per process is roughly the same.
    processes: Optional[int] = None

    #Network interface like ‘eth0’ or ‘ib0’. This will be used both for the Dask
    #scheduler and the Dask workers interface. If you need a different interface
    #for the Dask scheduler you can pass it through the scheduler_options argument:
    #interface=your_worker_interface, scheduler_options={'interface': your_scheduler_interface}.
    interface: Optional[str] = None

    #Dask worker local directory for file spilling.
    local_directory: Optional[str] = None

    #Additional arguments to pass to dask-worker
    extra: Optional[List[str]] = None

    #Other commands to add to script before launching worker.
    env_extra: Optional[List[str]] = None

    #Lines to skip in the header. Header lines matching this text will be removed
    header_skip: Optional[List[int]] = None

    #Directory to use for job scheduler logs.
    log_directory: Optional[str] = None

    #Path to desired interpreter for your batch submission script.
    shebang: Optional[str] = None

    #Python executable used to launch Dask workers. Defaults to the Python that is submitting these jobs
    python: Optional[str] = None

    #Section to use from jobqueue.yaml configuration file.
    config_name: Optional[str] = None

    #Name of Dask worker. This is typically set by the Cluster
    name: Optional[str] = None

    #Number of workers to start by default. Defaults to 0. See the scale method
    n_workers: Optional[int] = 0

    #Log level like “debug”, “info”, or “error” to emit here if the scheduler is started locally
    silence_logs: Optional[str] = None

    #Whether or not to run this cluster object with the async/await syntax
    asynchronous: Optional[bool] = False

    #Used to pass additional arguments to Dask Scheduler. For example use
    #scheduler_options={'dasboard_address': ':12435'} to specify which port the web dashboard should use or
    #scheduler_options={'host': 'your-host'} to specify the host the Dask scheduler should run on.
    #See distributed.Scheduler for more details.
    scheduler_options: Optional[Dict[str, str]] = None

    #Walltime for each worker job.
    walltime: Optional[str] = None

    #Number of cpu to book, if None, defaults to worker threads * processes
    job_cpu: Optional[int] = None

    #Amount of memory to request. If None, defaults to worker processes * memory
    job_mem: Optional[str] = None

    #List of other scheduler options. Each option will be prepended with the correct scheduler prefix.
    job_extra: Optional[List[str]]


@dataclass
class DaskLauncherConf(ObjectConf):
    cls: str = "hydra_plugins.hydra_dask_launcher.dask_launcher.DaskLauncher"
    joblib: JoblibConf = JoblibConf()
    dask: DaskConf = DaskConf()


ConfigStore.instance().store(
    group="hydra/launcher",
    name="dask",
    node=DaskLauncherConf,
    provider="dask_launcher",
)
