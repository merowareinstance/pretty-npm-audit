const parserModule = require("./parser.module");
const logger = require("./logger.module");

let payload = "";

function resetPayload() {
  payload = "";
}

function onData(data) {
  try {
    payload += data.toString().trim();
  } catch (e) {
    throw new Error("Could not convert partial data to string");
  }
}

function onError(data, dirPath) {
  logger.info(`${data.toString().trim()} : Path provided ${dirPath}`);
  throw new Error("Received error while parsing npm audit");
}

function onClose(useConfig) {
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
  resetPayload,
};
