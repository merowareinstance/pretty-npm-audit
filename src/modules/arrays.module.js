function reverseObjectByKeys(obj) {
  const newObject = {};
  const keys = Object.keys(obj);
  const reversedKeys = keys.reverse();
  reversedKeys.forEach((key) => {
    newObject[key] = obj[key];
  });
  return newObject;
}

function objectToString(obj) {
  let objStr = "";
  Object.keys(obj).forEach((key) => {
    obj[key].forEach((entry) => {
      objStr += entry;
    });
  });

  return objStr;
}

module.exports = {
  reverseObjectByKeys,
  objectToString,
};
