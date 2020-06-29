jest.unmock("../../parser.module");
const logger = require("../../logger.module");
const arraysModule = require("../../arrays.module");
const parserModule = require("../../parser.module");

describe("Parser Module Unit Test", () => {
  describe("buildTable", () => {
    test("Should return properly formatted table from data provided", () => {
      expect(
        parserModule.buildTable({
          title: "some title",
          moduleName: "some moduleName",
          vulnerableVersions: "some vulnerableVersions",
          patchedVersions: "some patchedVersions",
          overview: "some overview",
          recommendation: "some recommendation",
          url: "some url",
          severity: "some severity",
        })
      )
        .toEqual(`╔═════════════════════╤═════════════════════════════════════════════════════════════════════════════╗
║ Title               │ some title                                                                  ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Level               │ some severity                                                               ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Package             │ some moduleName                                                             ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Overview            │ some overview                                                               ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Vulnerable Versions │ some vulnerableVersions                                                     ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Patched Versions    │ some patchedVersions                                                        ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ Recommendation      │ some recommendation                                                         ║
╟─────────────────────┼─────────────────────────────────────────────────────────────────────────────╢
║ More Info           │ some url                                                                    ║
╚═════════════════════╧═════════════════════════════════════════════════════════════════════════════╝
`);
    });
  });

  describe("parse", () => {
    let payload;
    beforeEach(() => {
      payload = {
        metadata: {
          vulnerabilities: {
            info: 4,
            low: 3,
            moderate: 7,
            high: 10,
            critical: 99,
          },
        },
        advisories: [
          {
            title: "some title",
            module_name: "some moduleName",
            vulnerable_versions: "some vulnerableVersions",
            patched_versions: "some patchedVersions",
            overview: "some overview",
            recommendation: "some recommendation",
            url: "some url",
            severity: "high",
          },
        ],
      };
    });
    test("Given the data provided it should return default sorted table and default pretty tables", () => {
      arraysModule.objectToString.mockImplementationOnce(
        () => "I'm a pretty string setup"
      );
      jest
        .spyOn(parserModule, "buildTable")
        .mockImplementationOnce(() => "some pretty table");
      const data = parserModule.parse({
        payload,
      });

      expect(arraysModule.reverseObjectByKeys).not.toHaveBeenCalled();
      expect(data).toEqual("I'm a pretty string setup");
    });

    test("Given the data provided it should return json pretty tables", () => {
      jest
        .spyOn(parserModule, "buildTable")
        .mockImplementationOnce(() => "some pretty table");
      const data = parserModule.parse({
        payload,
        sort: undefined,
        jsonPretty: true,
      });

      expect(arraysModule.objectToString).not.toHaveBeenCalled();
      expect(arraysModule.reverseObjectByKeys).not.toHaveBeenCalled();
      expect(data).toEqual({
        critical: [],
        high: ["some pretty table"],
        moderate: [],
        info: [],
        low: [],
      });
    });

    test("Given the data provided it should return sorted table asc", () => {
      jest
        .spyOn(parserModule, "buildTable")
        .mockImplementationOnce(() => "some pretty table");
      arraysModule.reverseObjectByKeys.mockImplementationOnce(
        () => "sorted tables"
      );
      const data = parserModule.parse({
        payload,
        sort: "asc",
        jsonPretty: true,
      });

      expect(arraysModule.objectToString).not.toHaveBeenCalled();
      expect(arraysModule.reverseObjectByKeys).toHaveBeenCalled();
      expect(data).toEqual("sorted tables");
    });

    test("Given the data provided it should return json data used to populate pretty tables", () => {
      const data = parserModule.parse({
        payload,
        sort: undefined,
        json: true,
      });

      expect(arraysModule.objectToString).not.toHaveBeenCalled();
      expect(arraysModule.reverseObjectByKeys).not.toHaveBeenCalled();
      expect(data).toEqual({
        critical: [],
        high: [
          {
            title: "some title",
            moduleName: "some moduleName",
            vulnerableVersions: "some vulnerableVersions",
            patchedVersions: "some patchedVersions",
            overview: "some overview",
            recommendation: "some recommendation",
            url: "some url",
            severity: "high",
          },
        ],
        moderate: [],
        info: [],
        low: [],
      });
      expect(logger.info).toHaveBeenCalledTimes(6);
    });

    test("Given the data provided it should return json data used to populate pretty tables and not call logger infos for vulnerabilities", () => {
      payload.metadata.vulnerabilities = {};
      const data = parserModule.parse({
        payload,
        sort: undefined,
        json: true,
      });

      expect(arraysModule.objectToString).not.toHaveBeenCalled();
      expect(arraysModule.reverseObjectByKeys).not.toHaveBeenCalled();
      expect(data).toEqual({
        critical: [],
        high: [
          {
            title: "some title",
            moduleName: "some moduleName",
            vulnerableVersions: "some vulnerableVersions",
            patchedVersions: "some patchedVersions",
            overview: "some overview",
            recommendation: "some recommendation",
            url: "some url",
            severity: "high",
          },
        ],
        moderate: [],
        info: [],
        low: [],
      });

      expect(logger.info).toHaveBeenCalledTimes(1);
    });
  });
});
