
require('dotenv').config();
const express       = require('express');
const session       = require('express-session');
const app           = express();
const port          = process.env.PORT ;
const Sequelize     = require('sequelize');
const authRoutes    = require('./routes/authRoute');
const vehicleRoutes = require('./routes/vehicleRoute');
const login         = require('./controllers/authController');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql' 
    }
  );

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('src/public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'ATV',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.get('/', login.loginGET, (req, res) => {
   res.render('main/main');
});

authRoutes(app);
vehicleRoutes(app);

app.get('*', (req, res) => { 
  res.render('error/404.ejs');
}) 
app.listen(port, (err) => {
    console.log(`Server started at port : ${port}`);
});
