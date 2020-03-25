const moment = require('moment');

exports.getCurrentTimeStamp = (timeFomat) => {
  return moment().tz('Europe/Istanbul').format(timeFomat);
};
