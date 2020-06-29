const { spawn } = require("child_process");
const { commandsModule, logger, npmProcModule } = require("./src/modules");

const useConfig = {
  dirPath: "./",
  debug: false,
  json: false,
  jsonPretty: false,
};

function config() {
  return useConfig;
}

function audit() {
  return new Promise((resolve, reject) => {
    let npmCommands = ["audit", "--json"];

    if (useConfig.auditLevel) {
      npmCommands = npmCommands.concat(["--audit-level", useConfig.auditLevel]);
    }

    if (useConfig.dirPath) {
      npmCommands = npmCommands.concat(["--prefix", useConfig.dirPath]);
    }

    let payload = "";
    const proc = spawn("npm", npmCommands);

    proc.stdout.on("data", (data) => {
      try {
        payload += npmProcModule.onData(data);
      } catch (e) {
        reject(e);
      }
    });

    proc.stderr.on("data", (data) => {
      try {
        npmProcModule.onError(data, useConfig.dirPath);
      } catch (e) {
        reject(e);
      }
    });

    proc.on("close", async () => {
      try {
        resolve(npmProcModule.onClose(payload, useConfig));
      } catch (e) {
        reject(e);
      }
    });
  });
}

/**
 * Initializes the configuration of npm audit pretty
 * @param  {...any} args
 */
function prettyAudit(...args) {
  if (args && args.length) {
    const [commands] = args;
    if (commands) {
      const {
        dirPath,
        sort,
        debug,
        json,
        jsonPretty,
        auditLevel,
      } = commandsModule.parseCommands(commands);

      if (json !== undefined && jsonPretty !== undefined) {
        throw new Error(
          "Please provide one option between json and jsonPretty"
        );
      }

      useConfig.dirPath = dirPath === undefined ? useConfig.dirPath : dirPath;
      useConfig.sort = sort === undefined ? useConfig.sort : sort;
      useConfig.debug = debug === undefined ? useConfig.debug : debug;
      useConfig.json = json === undefined ? useConfig.json : json;
      useConfig.jsonPretty =
        jsonPretty === undefined ? useConfig.jsonPretty : jsonPretty;
      useConfig.auditLevel =
        auditLevel === undefined ? useConfig.auditLevel : auditLevel;
    }
  }

  // Reset config if changed
  logger.setConfig({
    enabled: !!useConfig.debug,
    prettyPrint: !!useConfig.debug,
  });
}

prettyAudit.config = config;
prettyAudit.audit = audit;

module.exports = prettyAudit;
