/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  const ROUTE_COMPETENCY = 'ROUTE_COMPETENCY.js';
  const filename = path.basename(__filename);
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (file !== filename) && (file !== ROUTE_COMPETENCY);
    })
    .forEach((file) => {
      require(`./${file}`)(app);
    });
};
