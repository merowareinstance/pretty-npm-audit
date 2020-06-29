jest.unmock("../../commands.module");
const fs = require("fs");
const arraysModule = require("../../commands.module");

describe("Commands Module Unit Test", () => {
  describe("parseCommands", () => {
    test("If command provided is null return empty object", () => {
      expect(arraysModule.parseCommands()).toEqual({});
    });
    test("If command provided is not object return empty object", () => {
      expect(arraysModule.parseCommands(true)).toEqual({});
    });
    test("If dirpath defined and not an actual path it should throw error", () => {
      jest.spyOn(fs, "existsSync").mockImplementationOnce(() => false);
      expect(() => {
        arraysModule.parseCommands({
          dirPath: "something else",
        });
      }).toThrow(new Error(`File path could not be found something else`));
    });

    test("If auditLevel defined and but not included in list allowed it should throw error", () => {
      expect(() => {
        arraysModule.parseCommands({
          auditLevel: "infinity",
        });
      }).toThrow(
        new Error("Audit Level needs to be one of low,moderate,high,critical")
      );
    });

    test("If should return all keys provided ignoring none supported ones", () => {
      jest.spyOn(fs, "existsSync").mockImplementationOnce(() => true);
      expect(
        arraysModule.parseCommands({
          dirPath: "./",
          auditLevel: "low",
          sort: "asc",
          debug: false,
          json: false,
          jsonPretty: false,
          somethingelse: "some other key",
        })
      ).toEqual({
        dirPath: "./",
        auditLevel: "low",
        sort: "asc",
        debug: false,
        json: false,
        jsonPretty: false,
      });
    });
  });
});
