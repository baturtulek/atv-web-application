const Sequelize = require('sequelize');
const chalk = require('chalk');
const dbConfig = require('../config/dbConfig');
const { loadModels, makeModelAssociations } = require('../models');

const DB = {};
DB.Sequelize = Sequelize;
const sequelize = new Sequelize(dbConfig);

const initializeDatabase = () => {
  loadModels(DB, sequelize);
  makeModelAssociations(DB);
  serve();
};

const serve = async () => {
  try {
    await sequelize.authenticate();
    console.log(chalk.green.bold('Database connection has been established successfully.'));
  } catch (error) {
    chalk.red.bold(error);
  }
};

module.exports = { DB, initializeDatabase };
