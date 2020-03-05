/* eslint-disable no-undef,linebreak-style */
require('dotenv').config();
const compression = require('compression');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const db = require('./config/db');
const hbsHelpers = require('./utils/hbsHelpers');

const app = express();

db.connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.use(morgan('dev'));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, '/views'));
app.engine(
  'hbs',
  hbs({
    helpers: {
      ifEquals: hbsHelpers.ifEquals,
      incrementByOne: hbsHelpers.incrementByOne,
    },
    extname: '.hbs',
    layoutDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
  }),
);

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    key: 'SID',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

require('./routes')(app);

app.get('*', (req, res) => {
  return res.render('layouts/error', { layout: 'error', partialName: '404' });
});

module.exports = app;
