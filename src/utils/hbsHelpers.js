
exports.ifEquals = (arg1, arg2, options) => {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
};

exports.incrementByOne = (value, options) => {
  return parseInt(value) + 1;
};
