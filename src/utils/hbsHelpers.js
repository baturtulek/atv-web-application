
exports.ifEquals = (arg1, arg2, options) => {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
};

exports.ifNotEquals = (arg1, arg2, options) => {
  return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
};

exports.incrementByOne = (value, options) => {
  return parseInt(value) + 1;
};

exports.ifIdInArr = (arg1, arg2, options) => {
  if (!arg1 || !arg2) return options.inverse(this);
  const idS = arg2.map((elm) => {
    return elm.id;
  });
  return idS.includes(arg1) ? options.fn(this) : options.inverse(this);
};
