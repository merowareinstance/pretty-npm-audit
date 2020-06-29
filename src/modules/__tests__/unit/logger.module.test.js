/* eslint-disable global-require */
jest.unmock("../../logger.module");

let pino;
let logger;

function resetSetup() {
  // Some tests depend on a clean config so we reset modules to make sure they are clear in cache
  jest.resetModules();
  pino = require("pino");
  logger = require("../../logger.module");
}

describe("Logger Module Unit Tests", () => {
  beforeEach(() => resetSetup());
  describe("constructor", () => {
    test("Should call pino constructor", () => {
      resetSetup();
      expect(pino).toHaveBeenCalledWith({
        enabled: false,
        prettyPrint: false,
      });
    });
  });

  describe("setConfig", () => {
    test("Should call pino constructor with new config provided", () => {
      logger.setConfig({
        enabled: true,
      });
      expect(pino).toHaveBeenCalledWith({
        enabled: true,
      });
    });
  });
  describe("info", () => {
    test("Should call logger info", () => {
      logger.logger = {
        info: jest.fn(),
      };
      logger.info("some kind of log");
      expect(logger.logger.info).toHaveBeenCalledWith(["some kind of log"]);
    });
  });
  describe("warn", () => {
    test("Should call logger warn", () => {
      logger.logger = {
        warn: jest.fn(),
      };
      logger.warn("some kind of log");
      expect(logger.logger.warn).toHaveBeenCalledWith(["some kind of log"]);
    });
  });
  describe("error", () => {
    test("Should call logger error", () => {
      logger.logger = {
        error: jest.fn(),
      };
      logger.error("some kind of log");
      expect(logger.logger.error).toHaveBeenCalledWith(["some kind of log"]);
    });
  });
  describe("debug", () => {
    test("Should call logger debug", () => {
      logger.logger = {
        debug: jest.fn(),
      };
      logger.debug("some kind of log");
      expect(logger.logger.debug).toHaveBeenCalledWith(["some kind of log"]);
    });
  });
  describe("critical", () => {
    test("Should call logger critical", () => {
      logger.logger = {
        critical: jest.fn(),
      };
      logger.critical("some kind of log");
      expect(logger.logger.critical).toHaveBeenCalledWith(["some kind of log"]);
    });
  });
  describe("fatal", () => {
    test("Should call logger info", () => {
      logger.logger = {
        fatal: jest.fn(),
      };
      logger.fatal("some kind of log");
      expect(logger.logger.fatal).toHaveBeenCalledWith(["some kind of log"]);
    });
  });
});
