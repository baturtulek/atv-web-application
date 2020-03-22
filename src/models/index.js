const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const chalk = require('chalk');

const db = {};
const basename = path.basename(__filename);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
});

const initializeDatabase = () => {
  loadModels();
  serve();
};

const loadModels = () => {
  fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

const serve = async () => {
  try {
    await sequelize.authenticate();
    console.log(chalk.green.bold('Database Connection has been established successfully.'));
  } catch (error) {
    chalk.red.bold(error);
  }
};

module.exports = { db, initializeDatabase };
