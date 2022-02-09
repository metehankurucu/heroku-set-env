<div align="center">
  <h1>
    <br/>
    <br />
        heroku-set-env
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <a href="https://www.npmjs.com/package/heroku-set-env">
       <img src="https://img.shields.io/npm/v/heroku-set-env?color=%231ABC9C" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/heroku-set-env">
      <img src="https://img.shields.io/npm/dm/heroku-set-env?color=%232ECC71" alt="downloads" />
    </a>
    <a>
      <img src="https://img.shields.io/npm/l/heroku-set-env" alt="license" />
    </a>
    <br />
    <br />
    <h3>
     Set all config vars from .env in Heroku project using one-command CLI.
    </h3>
  </sup>
</div>

## Installation

```bash
npm i -g heroku-set-env
#or
yarn global add heroku-set-env
```

## Usage

You need to login Heroku CLI first. Run `heroku login` if you are not logged in.

```bash
    $ heroku-set-env --help

    Usage
        $ heroku-set-env -a "your-app-name"

    Options
        --app -a App name of heroku project (required)
        --path -p  Path of .env file (optional)
        --help

    Example
        $ heroku-set-env -a example-project
        $ heroku-set-env -a example-project -p .env.example
```

## Example

```
npm i --save-dev heroku-set-env
```

then set script in package.json

```json
{
    ...
    "scripts":{
        ...
        "heroku-config": "heroku-set-env -a your-app-name -p .env.heroku"
    }
}
```

then run script

```bash
npm run heroku-config
```

then all vars in .env.heroku set to the your Heroku project.
