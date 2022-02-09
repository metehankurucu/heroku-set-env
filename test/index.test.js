const { getEnv } = require("../lib");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

test("should get correct env variables", async () => {
  const env = getEnv("test/.env.example");
  expect(env).toEqual({ EXAMPLE_VAR: "example-value" });
});

test("should set config vars from cli on Heroku", async () => {
  const { err: setErr, stdout: setOut } = await exec(
    "node . -a example-project-heroku -p 'test/.env.example'"
  );
  expect(setOut).toContain("EXAMPLE_VAR: example-value");
  expect(setOut).toContain("Done!");
  expect(setErr).toBeUndefined();

  const { stdout } = await exec(
    "heroku config:get EXAMPLE_VAR -a example-project-heroku"
  );
  expect(stdout).toEqual("example-value\n");
});
