const { table } = require("table");
const logger = require("./logger.module");
const arraysModule = require("./arrays.module");

function buildTable({
  title,
  moduleName,
  vulnerableVersions,
  patchedVersions,
  overview,
  recommendation,
  url,
  severity,
}) {
  const data = table(
    [
      ["Title", title],
      ["Level", severity],
      ["Package", moduleName],
      ["Overview", overview],
      ["Vulnerable Versions", vulnerableVersions],
      ["Patched Versions", patchedVersions],
      ["Recommendation", recommendation],
      ["More Info", url],
    ],
    {
      columns: {
        1: {
          width: 75,
        },
      },
    }
  );

  return data;
}

function parse({ payload, sort, json, jsonPretty }) {
  const { metadata, advisories } = payload;

  const { vulnerabilities } = metadata;

  const { info, low, moderate, high, critical } = vulnerabilities;

  // TODO: Check for inputs to see what level we should be annotating

  if (info > 0) {
    logger.info(`Received ${info} info vulnerabilities`);
  }

  if (low > 0) {
    logger.info(`Received ${low} low vulnerabilities`);
  }

  if (moderate > 0) {
    logger.info(`Received ${moderate} moderate vulnerabilities`);
  }

  if (high > 0) {
    logger.info(`Received ${high} high vulnerabilities`);
  }

  if (critical > 0) {
    logger.info(`Received ${critical} critical vulnerabilities`);
  }

  const advisoryNumbers = Object.keys(advisories);

  // TODO: Cleanup how we create this tables so that we don't have to have
  // two identical root level objects
  // Defaults to dsc - highest to lowest priority
  const advisoryTablesJson = {
    critical: [],
    high: [],
    moderate: [],
    low: [],
    info: [],
  };

  const advisoryTablesJsonPretty = {
    critical: [],
    high: [],
    moderate: [],
    low: [],
    info: [],
  };

  advisoryNumbers.forEach((number) => {
    const advisory = advisories[number];
    const {
      title,
      module_name: moduleName,
      vulnerable_versions: vulnerableVersions,
      patched_versions: patchedVersions,
      overview,
      recommendation,
      url,
      severity,
    } = advisory;

    logger.info({
      title,
      module_name: moduleName,
      vulnerable_versions: vulnerableVersions,
      patched_versions: patchedVersions,
      overview,
      recommendation,
      url,
      severity,
    });

    const cleanJson = {
      title,
      moduleName,
      vulnerableVersions,
      patchedVersions,
      overview,
      recommendation,
      url,
      severity,
    };

    advisoryTablesJson[severity].push(cleanJson);

    advisoryTablesJsonPretty[severity].push(this.buildTable(cleanJson));
  });

  // Defaults to dsc - highest to lowest priority
  let sortedTables =
    json === true ? advisoryTablesJson : advisoryTablesJsonPretty;

  if (sort && sort === "asc") {
    sortedTables = arraysModule.reverseObjectByKeys(sortedTables);
  }

  // Return all tables squashed into a string of tables
  if (!jsonPretty && !json) {
    return arraysModule.objectToString(sortedTables);
  }

  return sortedTables;
}

module.exports = {
  parse,
  buildTable,
};
