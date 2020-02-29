/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const fs = require('fs');

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return;
    const name = file.substr(0, file.indexOf('.js'));
    require(`./${name}`)(app);
  });
};
