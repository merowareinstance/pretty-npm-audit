const { spawn } = require("child_process");
const { parserModule, commandsModule, logger } = require("./src/modules");

const useConfig = {
  dirPath: "./",
  environment: "ci",
  debug: false,
  json: false,
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

    proc.stderr.on("data", (data) => {
      logger.info(`${data.toString().trim()} : Path provided ${useConfig.dirPath}`);
      reject(new Error("Received error while parsing npm audit"));
    });

    proc.on("close", async () => {
      try {
        const completePayload = JSON.parse(payload);
        const data = parserModule.parse({
          payload: completePayload,
          sort: useConfig.sort,
          json: useConfig.json,
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
        json,
      } = commandsModule.parseCommands(commands);

      useConfig.dirPath = dirPath === undefined ? useConfig.dirPath : dirPath;
      useConfig.environment =
        environment === undefined ? useConfig.environment : environment;
      useConfig.sort = sort === undefined ? useConfig.sort : sort;
      useConfig.debug = debug === undefined ? useConfig.debug : debug;
      useConfig.json = json === undefined ? useConfig.json : json;
    }
  }

  // Reset config if changed
  logger.setConfig({
    enabled: useConfig.debug,
    prettyPrint: useConfig.debug,
  });
}

prettyAudit.config = config;
prettyAudit.audit = audit;

module.exports = prettyAudit;
