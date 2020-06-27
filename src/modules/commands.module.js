const fs = require("fs");

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
    const { dirPath, sort, debug, json, jsonPretty } = commands;
    // TODO: Go through and do param validation e.g make sure dirpath is an actual path
  
    if (dirPath && !fs.existsSync(dirPath)) {
      throw new Error(`File path could not be found ${dirPath}`);
    }

    return {
      dirPath,
      sort,
      debug,
      json,
      jsonPretty,
    };
  }
  return {};
}

module.exports = {
  parseCommands,
};
