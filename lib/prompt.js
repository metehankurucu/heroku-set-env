const inquirer = require("inquirer");

const prompt = ({ type, name }) => {
  return async ({ message, defaultValue = null, ...options }) => {
    try {
      const answer = await inquirer.prompt([
        {
          name,
          type,
          message,
          default: () => defaultValue,
          ...options,
        },
      ]);
      return answer[name];
    } catch (error) {
      console.log("Error when prompting", error);
      return defaultValue;
    }
  };
};

const question = prompt({ type: "input", name: "question" });

module.exports = {
  prompt,
  question,
};
