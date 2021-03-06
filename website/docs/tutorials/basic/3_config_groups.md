---
id: config_groups
title: Config groups
sidebar_label: Config groups
---
This is the most important concept in Hydra.

Suppose you want to benchmark PostgreSQL and MySQL for your application.
When running of the application, you will need either MySQL or PostgreSQL - but not both.

The way to do this with Hydra is with a **Config group**.
A config group is a mutually exclusive set of configuration files.

To create a config group, create a directory. e.g. `db` to hold a file for each database configuration alternative. 
Since we are expecting to have multiple config groups, we will proactively move all the configuration files 
into a `conf` directory.

Python file: `my_app.py`
```python
@hydra.main(config_path="conf")
def my_app(cfg: DictConfig) -> None:
    print(cfg.pretty())
```


`config_path` can specify your config file as in the [previous command line example](./1_simple_cli_app.md), or the root directory for your configuration files.
If a config file is specified, its directory is the root directory.

The directory structure of our application now looks like:
```text
├── conf
│   └── db
│       ├── mysql.yaml
│       └── postgresql.yaml
└── my_app.py
```

If you run my_app.py, it prints an empty config because no configuration was specified.
```yaml
$ python my_app.py
{}
```

You can now choose which database configuration to use from the command line:
```yaml
$ python my_app.py db=postgresql
db:
  driver: postgresql
  pass: drowssap
  timeout: 10
  user: postgre_user
```

Like before, you can still override individual values in the resulting config:
```yaml
$ python my_app.py db=postgresql db.timeout=20
db:
  driver: postgresql
  pass: drowssap
  timeout: 20
  user: postgre_user
```

This simple example demonstrated a very powerful feature of Hydra:
You can compose your configuration object from multiple configuration files.

For example, you can add a second config group controlling another aspect of your application:
```
$ python my_app.py db=postgresql walk=depth_first
```

### Overriding the package
You can override the package defined in the config file via the command line with the syntax `group@package=choice`,
for example:

```yaml
$ python examples/tutorial/3_config_groups/my_app.py db@foo.bar=mysql 
foo:
  bar:
    driver: mysql
    user: omry
    pass: secret
```