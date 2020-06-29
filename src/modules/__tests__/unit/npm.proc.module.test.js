jest.unmock("../../npm.proc.module");
const parserModule = require("../../parser.module");
const logger = require("../../logger.module");
const arraysModule = require("../../npm.proc.module");

describe("Npm Proc Module Unit Test", () => {
  describe("resetPayload and getPayload", () => {
    test("Should reset payload properly", () => {
      arraysModule.resetPayload();
      expect(arraysModule.getPayload()).toEqual("");
    });
  });

  describe("onData", () => {
    test("Should throw if data.tostring throws", () => {
      const data = {
        toString() {
          throw new Error("To string failed");
        },
      };
      expect(() => arraysModule.onData(data)).toThrow(
        new Error("Could not convert partial data to string")
      );
    });

    test("Should not throw if all goes well", () => {
      expect(() => arraysModule.onData("some string")).not.toThrow();
    });
  });

  describe("onError", () => {
    test("Should throw and call logger if this function is called", () => {
      expect(() => arraysModule.onError("some string", "some path")).toThrow(
        new Error("Received error while parsing npm audit")
      );
      expect(logger.info).toHaveBeenCalledWith(
        "some string : Path provided some path"
      );
    });
  });

  describe("onClose", () => {
    test("Should throw if json parse fails", () => {
      jest.spyOn(JSON, "parse").mockImplementationOnce(() => {
        throw new Error("Failed parsing json");
      });
      expect(() => arraysModule.onClose()).toThrow(
        new Error("Could not convert npm audit data")
      );
    });

    test("Should not throw error if all is well", () => {
      jest.spyOn(JSON, "parse").mockImplementationOnce(() => ({
        candy: "apple",
      }));
      parserModule.parse.mockImplementationOnce(() => ({
        test: "something",
      }));
      expect(
        arraysModule.onClose({
          sort: "asc",
          json: true,
          jsonPretty: false,
        })
      ).toEqual({
        test: "something",
      });

      expect(parserModule.parse).toHaveBeenCalledWith({
        payload: {
          candy: "apple",
        },
        sort: "asc",
        json: true,
        jsonPretty: false,
      });
    });
  });
});
