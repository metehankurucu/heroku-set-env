const dotenv = require("dotenv");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const chalk = require("chalk");
const { question } = require("./prompt");

const getEnv = (path = "") => {
  const result = dotenv.config({ path });
  if (result.error) throw result.error;
  return result.parsed;
};

const getParams = async () => {
  const appName = await question({
    message: "Enter name of your Heroku app",
  });

  if (!appName) throw new Error("Heroku app name is required.");

  const path = await question({
    message: "Enter path of .env file (optional)",
    defaultValue: ".",
  });

  return {
    appName,
    path,
  };
};

const run = async () => {
  try {
    const { appName, path } = await getParams();
    const parsed = getEnv(path);

    const configCommand = Object.keys(parsed)
      .map((key) => `${key}=${parsed[key]}`)
      .join(" ");

    const result = await exec(
      `heroku config:set ${configCommand} -a ${appName}`
    );

    console.log(result.stderr);
    console.log(chalk.blueBright(result.stdout));
    console.log(chalk.bold.greenBright("Done!"));
  } catch (error) {
    console.error(error);
  }
};

module.exports = run;
