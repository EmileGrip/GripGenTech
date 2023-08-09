function replaceNullWithEmptyString(obj, stateObj) {
  if (!obj || !stateObj) {
    return stateObj;
  }
  return Object.fromEntries(
    Object.entries(stateObj).map(([key, value]) => [
      key,
      key in obj ? (obj[key] === null ? "" : obj[key]) : value,
    ])
  );
}

export default replaceNullWithEmptyString;
