
exports.getNullableInput = (inputValue) => {
  if (inputValue.trim() === '' || inputValue.trim() === undefined) {
    return null;
  }
  return inputValue;
};

exports.getCheckboxStatus = (input) => {
  if (input === undefined) {
    return false;
  }
  return true;
};
