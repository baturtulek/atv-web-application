
exports.ifEquals = (arg1, arg2, options) => {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
};

exports.incrementByOne = (value) => {
  return parseInt(value) + 1;
};

exports.ifIdInArr = (arg1, arg2, options) => {
  if (!arg1 || !arg2) {
    return options.inverse(this);
  }
  const arg2IdList = arg2.map((element) => {
    return element.id;
  });
  return arg2IdList.includes(arg1) ? options.fn(this) : options.inverse(this);
};

exports.isUserCompetencyIncludes = (name, userCompetencyList, options) => {
  if (!userCompetencyList) {
    return options.inverse(this);
  }
  for (const element of userCompetencyList) {
    if (element['COMPETENCies.description'] == name) {
      return options.fn(this);
    }
  }
  return options.inverse(this);
};
