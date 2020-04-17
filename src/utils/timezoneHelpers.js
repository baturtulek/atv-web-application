const moment = require('moment');

exports.getFormattedTimeStamp = (timeFomat) => {
  return moment().tz('Europe/Istanbul').format(timeFomat);
};
