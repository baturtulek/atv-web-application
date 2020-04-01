const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['tr'],
  defaultLocale: 'tr',
  directory: path.join('./src/', 'locales'),
});

module.exports = i18n;
