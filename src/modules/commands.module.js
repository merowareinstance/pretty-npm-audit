const fs = require("fs");

const auditLevels = ["low", "moderate", "high", "critical"];

/**
 * Parses commands into supported ones and ignores the rest
 * @param {Object} commands
 * @param {String} commands.dirPath
 * @param {String} commands.sort
 * @param {Boolean} commands.debug
 * @param {Boolean} commands.json
 * @param {Boolean} commands.jsonPretty
 */
function parseCommands(commands) {
  if (commands && typeof commands === "object") {
    const { dirPath, sort, debug, json, jsonPretty, auditLevel } = commands;
    // TODO: Go through and do param validation e.g make sure dirpath is an actual path

    if (dirPath && !fs.existsSync(dirPath)) {
      throw new Error(`File path could not be found ${dirPath}`);
    }

    if (auditLevel && !auditLevels.includes(auditLevel)) {
      throw new Error(`Audit Level needs to be one of ${auditLevels}`);
    }

    return {
      dirPath,
      sort,
      debug,
      json,
      jsonPretty,
      auditLevel,
    };
  }
  return {};
}

module.exports = {
  parseCommands,
};
