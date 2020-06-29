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

  info(...args) {
    // eslint-disable-next-line prefer-rest-params
    this.logger.info(args);
  }

  warn(...args) {
    // eslint-disable-next-line prefer-rest-params
    this.logger.warn(args);
  }

  error(...args) {
    // eslint-disable-next-line prefer-rest-params
    this.logger.error(args);
  }

  debug(...args) {
    // eslint-disable-next-line prefer-rest-params
    this.logger.debug(args);
  }

  critical(...args) {
    // eslint-disable-next-line prefer-rest-params
    this.logger.critical(args);
  }

  fatal(...args) {
    // eslint-disable-next-line prefer-rest-params
    this.logger.fatal(args);
  }
}

module.exports = new Logger();
