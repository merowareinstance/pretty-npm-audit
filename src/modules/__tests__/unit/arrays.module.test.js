jest.unmock("../../arrays.module");
const arraysModule = require("../../arrays.module");

describe("Arrays Module Unit Test", () => {
  describe("reverseObjectByKeys", () => {
    test("Should return proper reversed object by keys", () => {
      const data = {
        candy: "apple",
        bread: "pudding",
        chocolate: "cupcake",
      };

      expect(arraysModule.reverseObjectByKeys(data)).toEqual({
        chocolate: "cupcake",
        bread: "pudding",
        candy: "apple",
      });
    });
  });

  describe("objectToString", () => {
    test("Should return proper object to string conversion", () => {
      const data = {
        chocolate: ["cupcake ", "cake "],
        bread: ["pudding ", "pizza "],
        candy: ["apple ", "corn"],
      };

      expect(arraysModule.objectToString(data)).toEqual(
        "cupcake cake pudding pizza apple corn"
      );
    });
  });
});
