const { spawn } = require("child_process");
const { parserModule, commandsModule, logger } = require("./src/modules");

const useConfig = {
  dirPath: "./",
  environment: "ci",
  debug: false,
};

function config() {
  return useConfig;
}

function audit() {
  return new Promise((resolve, reject) => {
    let npmCommands = ["audit", "--json"];

    if (useConfig.dirPath) {
      npmCommands = npmCommands.concat(["--prefix", useConfig.dirPath]);
    }

    let payload = "";
    const proc = spawn("npm", npmCommands);

    proc.stdout.on("data", (data) => {
      try {
        const dataToParse = data.toString().trim();
        payload += dataToParse;
      } catch (e) {
        reject(new Error("Could not convert partial data to string"));
      }
    });

    proc.stderr.on("data", () => {
      reject(new Error("Received error while parsing npm audit"));
    });

    proc.on("close", async () => {
      try {
        const completePayload = JSON.parse(payload);
        const data = parserModule.parse({
          payload: completePayload,
          sort: useConfig.sort,
        });
        resolve(data);
      } catch (e) {
        reject(new Error("Could not convert npm audit data"));
      }
    });
  });
}

/**
 * Initializes the configuration of npm audit pretty
 * @param  {...any} args
 */
function prettyAudit(...args) {
  if (args.length) {
    const [commands] = args;
    if (commands) {
      const {
        dirPath,
        environment,
        sort,
        debug,
      } = commandsModule.parseCommands(commands);

      useConfig.dirPath = dirPath || useConfig.dirPath;
      useConfig.environment = environment || useConfig.environment;
      useConfig.sort = sort || useConfig.sort;
      useConfig.debug = debug || useConfig.debug;
    }
  }

  logger.setConfig({
    enabled: useConfig.debug,
    prettyPrint: useConfig.debug,
  });
}

prettyAudit.config = config;
prettyAudit.audit = audit;

module.exports = prettyAudit;
