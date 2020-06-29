/* eslint-disable global-require */
jest.unmock("../../index");
let spawn;
let npmProcModule;
let commandsModule;
let logger;
let prettyAudit;

function resetSetup() {
  // Some tests depend on a clean config so we reset modules to make sure they are clear in cache
  jest.resetModules();
  ({ spawn } = require("child_process"));
  ({ commandsModule, logger, npmProcModule } = require("../../src/modules"));
  prettyAudit = require("../../index");
}

describe("Main Index Unit Test", () => {
  beforeAll(() => {
    resetSetup();
  });
  describe("config", () => {
    test("Should return default config when not set", () => {
      expect(prettyAudit.config()).toEqual({
        dirPath: "./",
        debug: false,
        json: false,
        jsonPretty: false,
      });
    });
  });

  describe("audit", () => {});

  describe("prettyAudit", () => {
    beforeEach(() => {
      resetSetup();
    });
    test("Should not call parse commands if args is null", () => {
      prettyAudit();
      expect(commandsModule.parseCommands).not.toHaveBeenCalled();
    });
    test("Should not call parse commands if args has null entities", () => {
      prettyAudit(null, null);
      expect(commandsModule.parseCommands).not.toHaveBeenCalled();
    });

    test("Should throw error if parsed commands includes both json and jsonPretty", () => {
      commandsModule.parseCommands.mockImplementationOnce(() => ({
        json: true,
        jsonPretty: true,
      }));
      expect(() => {
        prettyAudit({
          json: true,
          jsonPretty: true,
        });
      }).toThrow(
        new Error("Please provide one option between json and jsonPretty")
      );
      expect(commandsModule.parseCommands).toHaveBeenCalledWith({
        json: true,
        jsonPretty: true,
      });
    });

    test("Should return default config if attributes are undefined", () => {
      commandsModule.parseCommands.mockImplementationOnce(() => ({
        test: true,
      }));
      expect(() => {
        prettyAudit({
          test: true,
        });
      }).not.toThrow();
      expect(commandsModule.parseCommands).toHaveBeenCalledWith({
        test: true,
      });

      expect(prettyAudit.config()).toEqual({
        dirPath: "./",
        debug: false,
        json: false,
        jsonPretty: false,
      });
    });

    test("Should override defaults with data provided and set config of logger properly", () => {
      jest.spyOn(logger, "setConfig");
      commandsModule.parseCommands.mockImplementationOnce(() => ({
        dirPath: "./",
        debug: true,
        jsonPretty: true,
        sort: "asc",
        auditLevel: "low",
      }));
      expect(() => {
        prettyAudit({
          dirPath: "./",
          debug: true,
          jsonPretty: true,
          sort: "asc",
          auditLevel: "low",
        });
      }).not.toThrow();
      expect(commandsModule.parseCommands).toHaveBeenCalledWith({
        dirPath: "./",
        debug: true,
        jsonPretty: true,
        sort: "asc",
        auditLevel: "low",
      });

      expect(prettyAudit.config()).toEqual({
        dirPath: "./",
        debug: true,
        json: false,
        jsonPretty: true,
        sort: "asc",
        auditLevel: "low",
      });

      expect(logger.setConfig).toHaveBeenCalledWith({
        enabled: true,
        prettyPrint: true,
      });
    });

    test("Should override defaults with data provided and set config of logger properly when json is true", () => {
      jest.spyOn(logger, "setConfig");
      commandsModule.parseCommands.mockImplementationOnce(() => ({
        dirPath: "./",
        debug: true,
        json: true,
        sort: "asc",
        auditLevel: "low",
      }));
      expect(() => {
        prettyAudit({
          dirPath: "./",
          debug: true,
          json: true,
          sort: "asc",
          auditLevel: "low",
        });
      }).not.toThrow();
      expect(commandsModule.parseCommands).toHaveBeenCalledWith({
        dirPath: "./",
        debug: true,
        json: true,
        sort: "asc",
        auditLevel: "low",
      });

      expect(prettyAudit.config()).toEqual({
        dirPath: "./",
        debug: true,
        json: true,
        jsonPretty: false,
        sort: "asc",
        auditLevel: "low",
      });

      expect(logger.setConfig).toHaveBeenCalledWith({
        enabled: true,
        prettyPrint: true,
      });
    });
  });
});
