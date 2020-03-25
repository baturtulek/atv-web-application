/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  const basename = path.basename(__filename);
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (file !== basename);
    })
    .forEach((file) => {
      require(`./${file}`)(app);
    });
};
