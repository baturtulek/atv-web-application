/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  const ROUTE_COMPETENCY = 'ROUTE_COMPETENCY.js';
  const basename = path.basename(__filename);
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (file !== basename) && (file !== ROUTE_COMPETENCY);
    })
    .forEach((file) => {
      require(`./${file}`)(app);
    });
};
