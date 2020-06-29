/* eslint-disable global-require */
jest.unmock("../../index");
let childProcess;
let npmProcModule;
let commandsModule;
let logger;
let prettyAudit;

function resetSetup() {
  // Some tests depend on a clean config so we reset modules to make sure they are clear in cache
  jest.resetModules();
  childProcess = require("child_process");
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

  describe("audit", () => {
    let spawnStub;
    beforeEach(() => {
      spawnStub = {
        stdout: {
          on: jest.fn((command, callback) => callback("some good data")),
        },
        stderr: {
          on: jest.fn((command, callback) => callback("some error data")),
        },
        on: jest.fn((command, callback) => callback()),
      };
    });

    test("Should not add prefix or audit level if not defined in config", async () => {
      jest.spyOn(childProcess, "spawn").mockImplementationOnce(() => spawnStub);
      commandsModule.parseCommands.mockImplementationOnce(() => ({
        dirPath: "",
      }));
      prettyAudit({
        dirPath: "",
      });

      await prettyAudit.audit();

      expect(childProcess.spawn).toHaveBeenCalledWith("npm", [
        "audit",
        "--json",
      ]);
      expect(spawnStub.stdout.on).toHaveBeenCalledWith(
        "data",
        expect.toBeFunction()
      );
      expect(spawnStub.stderr.on).toHaveBeenCalledWith(
        "data",
        expect.toBeFunction()
      );
      expect(spawnStub.on).toHaveBeenCalledWith("close", expect.toBeFunction());
    });

    test("Should add prefix or audit level if defined in config", async () => {
      jest.spyOn(childProcess, "spawn").mockImplementationOnce(() => spawnStub);
      commandsModule.parseCommands.mockImplementationOnce(() => ({
        dirPath: "./some-repo",
        auditLevel: "moderate",
      }));
      prettyAudit({
        dirPath: "./some-repo",
        auditLevel: "moderate",
      });

      await prettyAudit.audit();

      expect(childProcess.spawn).toHaveBeenCalledWith("npm", [
        "audit",
        "--json",
        "--audit-level",
        "moderate",
        "--prefix",
        "./some-repo",
      ]);
      expect(npmProcModule.resetPayload).toHaveBeenCalled();
      expect(spawnStub.stdout.on).toHaveBeenCalledWith(
        "data",
        expect.toBeFunction()
      );
      expect(spawnStub.stderr.on).toHaveBeenCalledWith(
        "data",
        expect.toBeFunction()
      );
      expect(spawnStub.on).toHaveBeenCalledWith("close", expect.toBeFunction());
    });

    test("Should return error if npmProcModule on data throws", async () => {
      jest.spyOn(childProcess, "spawn").mockImplementationOnce(() => spawnStub);
      commandsModule.parseCommands.mockImplementationOnce(() => ({
        dirPath: "./",
        auditLevel: "",
      }));
      prettyAudit({
        dirPath: "./",
        auditLevel: "",
      });
      const errorToThrow = new Error("Failed on npm proc module data");
      spawnStub.stderr.on.mockRejectedValueOnce(errorToThrow);
      expect(prettyAudit.audit()).rejects.toEqual(errorToThrow);

      expect(childProcess.spawn).toHaveBeenCalledWith("npm", [
        "audit",
        "--json",
        "--prefix",
        "./",
      ]);
      expect(spawnStub.stdout.on).toHaveBeenCalledWith(
        "data",
        expect.toBeFunction()
      );
      expect(spawnStub.stderr.on).toHaveBeenCalledWith(
        "data",
        expect.toBeFunction()
      );
      expect(spawnStub.on).toHaveBeenCalledWith("close", expect.toBeFunction());
    });
  });

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
