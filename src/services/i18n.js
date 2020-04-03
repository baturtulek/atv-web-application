const i18n = require('i18n');

i18n.configure({
  locales: ['tr'],
  defaultLocale: 'tr',
  directory: './src/locales',
});

module.exports = i18n;
