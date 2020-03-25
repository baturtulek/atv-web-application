const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const chalk = require('chalk');
const DB_CONFIG = require('../config/DB_CONFIG.js')[process.env.NODE_ENV];

const db = {};
db.Sequelize = Sequelize;
const sequelize = new Sequelize(DB_CONFIG);

const initializeDatabase = () => {
  loadModels();
  makeModelAssociations();
  serve();
};

const loadModels = () => {
  const basename = path.basename(__filename);
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (file !== basename);
    })
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });
};

const makeModelAssociations = () => {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

const serve = async () => {
  try {
    await sequelize.authenticate();
    console.log(chalk.green.bold('Database connection has been established successfully.'));
  } catch (error) {
    chalk.red.bold(error);
  }
};

module.exports = { db, initializeDatabase };
