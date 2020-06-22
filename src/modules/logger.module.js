const pino = require("pino");

class Logger {
  constructor() {
    // Disable logging by default
    this.logger = pino({
      enabled: false,
      prettyPrint: false,
    });
  }

  setConfig(config) {
    this.logger = pino(config);
  }

  info() {
    // eslint-disable-next-line prefer-rest-params
    this.logger.info(arguments);
  }

  warn() {
    // eslint-disable-next-line prefer-rest-params
    this.logger.warn(arguments);
  }

  error() {
    // eslint-disable-next-line prefer-rest-params
    this.logger.error(arguments);
  }

  debug() {
    // eslint-disable-next-line prefer-rest-params
    this.logger.debug(arguments);
  }

  critical() {
    // eslint-disable-next-line prefer-rest-params
    this.logger.critical(arguments);
  }

  fatal() {
    // eslint-disable-next-line prefer-rest-params
    this.logger.fatal(arguments);
  }
}

module.exports = new Logger();
