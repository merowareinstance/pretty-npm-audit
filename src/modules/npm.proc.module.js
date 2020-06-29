const parserModule = require("./parser.module");
const logger = require("./logger.module");

function onData(data) {
  try {
    const dataToParse = data.toString().trim();
    return dataToParse;
  } catch (e) {
    throw new Error("Could not convert partial data to string");
  }
}

function onError(data) {
  logger.info(`${data.toString().trim()} : Path provided ${useConfig.dirPath}`);
  throw new Error("Received error while parsing npm audit");
}

function onClose(payload, useConfig) {
  try {
    const completePayload = JSON.parse(payload);
    const data = parserModule.parse({
      payload: completePayload,
      sort: useConfig.sort,
      json: useConfig.json,
      jsonPretty: useConfig.jsonPretty,
    });
    return data;
  } catch (e) {
    throw new Error("Could not convert npm audit data");
  }
}

module.exports = {
  onData,
  onError,
  onClose,
};
