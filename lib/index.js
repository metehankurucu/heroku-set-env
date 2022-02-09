const dotenv = require("dotenv");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const chalk = require("chalk");
const meow = require("meow");

const getEnv = (path = ".env") => {
  const result = dotenv.config({ path });
  if (result.error) throw result.error;
  return result.parsed;
};

const checkAuth = async () => {
  try {
    await exec("heroku whoami");
  } catch (error) {
    console.error(
      "Not logged in to Heroku. Please run `heroku login` before using cli."
    );
    process.exit(1);
  }
};

const run = async () => {
  try {
    const cli = meow(
      `
        ${chalk.bgBlack.bold.green("heroku-set-env")}
    
        ${chalk.green("Usage")}
          $ heroku-set-env -a "your-app-name"
    
        ${chalk.green("Options")}
          --app, -a App name of heroku project (required)
          --path, -p  Path of .env file (optional)
          --help
    
        ${chalk.green("Example")}
          $ heroku-set-env -a example-project
          $ heroku-set-env -a example-project -p .env.example
    `,
      {
        flags: {
          path: {
            type: "string",
            default: ".env",
            alias: "p",
          },
          app: {
            type: "string",
            alias: "a",
          },
        },
      }
    );

    await checkAuth();

    const { app, path } = cli.flags;

    if (!app) {
      console.log("Heroku app name is required. Please use --app or -a flag.");
      process.exit(1);
    }

    const parsed = getEnv(path);

    const configParams = Object.keys(parsed)
      .map((key) => `${key}=${parsed[key]}`)
      .join(" ");

    const result = await exec(`heroku config:set ${configParams} -a ${app}`);

    console.log(result.stderr);
    console.log(chalk.blueBright(result.stdout));
    console.log(chalk.bold.greenBright("Done!"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = {
  run,
  getEnv,
};
