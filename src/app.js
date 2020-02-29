/* eslint-disable no-undef */

require('dotenv').config();
const compression = require('compression');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const defaultRoute = require('./routes/default.route');
const authRoutes = require('./routes/auth.route');
const vehicleRoutes = require('./routes/vehicle.route');
const competencyRoutes = require('./routes/competency.route');
const userRoleRoutes = require('./routes/userRole.route');
const parkingLotRoutes = require('./routes/parkingLot.route');
const db = require('./config/db');

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
    extname: '.hbs',
    layoutDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
  }),
);

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    key: 'sid',
    secret: 'ATV',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

defaultRoute(app);
authRoutes(app);
vehicleRoutes(app);
competencyRoutes(app);
userRoleRoutes(app);
parkingLotRoutes(app);

app.get('*', (req, res) => {
  const error = 'Error 404 view should be here.';
  res.status(404).json({
    error,
  });
});

module.exports = app;
