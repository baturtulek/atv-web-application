/* eslint-disable no-undef */

require('dotenv').config();
const compression   = require('compression');
const express       = require('express');
const session       = require('express-session');
const app           = express();
const authRoutes    = require('./routes/authRoute');
const vehicleRoutes = require('./routes/vehicleRoute');
const auth          = require('./controllers/authController');
const db            = require('./config/db');
const path          = require('path');
const hbs           = require('express-handlebars');
const helmet        = require('helmet');
const morgan        = require('morgan');
const winston       = require('./config/winston');


db.connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});

//app.use(morgan('combined'), { stream: winston.stream });
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'auth',
    layoutDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'ATV',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.get('/', auth.loginView, (req, res) => {
   res.status(200).json({
     message: `You're logged in. this should show main view`
   });
});

authRoutes(app);
vehicleRoutes(app);

app.get('*', (req, res) => {
  const error = `Error 404 view should be here.`;
  res.status(404).json({
    error
  });
  //winston.error(error);
}) 
app.listen(process.env.PORT, () => {
    console.log(`Server started at port : ${process.env.PORT}`);
});
