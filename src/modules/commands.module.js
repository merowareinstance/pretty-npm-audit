/**
 * Parses commands into supported ones and ignores the rest
 * @param {Object} commands
 * @param {String} commands.dirPath
 * @param {String} commands.environment
 * @param {String} commands.sort
 * @param {Boolean} commands.debug
 */
function parseCommands(commands) {
  if (commands && typeof commands === "object") {
    const { dirPath, environment, sort, debug, json } = commands;
    // TODO: Go through and do param validation e.g make sure dirpath is an actual path

    return {
      dirPath,
      environment,
      sort,
      debug,
      json,
    };
  }
  return {};
}

module.exports = {
  parseCommands,
};
