# Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved
# type: ignore
from setuptools import find_namespace_packages, setup

with open("README.md", "r") as fh:
    LONG_DESC = fh.read()
    setup(
        name="hydra-dask-launcher",
        version="0.1",
        author="Eli Draizen, Jan-Matthis Lueckmann, Omry Yadan",
        author_email="edraizen@gmail.com, mail@jan-matthis.de, omry@fb.com",
        description="Dask Launcher for Hydra apps",
        long_description=LONG_DESC,
        long_description_content_type="text/markdown",
        url="https://github.com/facebookresearch/hydra/",
        packages=find_namespace_packages(include=["hydra_plugins.*"]),
        classifiers=[
            "License :: OSI Approved :: MIT License",
            "Programming Language :: Python :: 3.7",
            "Programming Language :: Python :: 3.8",
            "Operating System :: MacOS",
            "Operating System :: Microsoft :: Windows",
            "Operating System :: POSIX :: Linux",
        ],
        install_requires=["hydra-core==1.0.*", "joblib>=0.14.0", "dask-jobqueue"],
        include_package_data=True,
    )
