const Sequelize = require('sequelize');
const chalk = require('chalk');
const dbConfig = require('../config/dbConfig')[process.env.NODE_ENV];
const { loadModels, makeModelAssociations } = require('../models');

const db = {};
db.Sequelize = Sequelize;
const sequelize = new Sequelize(dbConfig);

const initializeDatabase = () => {
  loadModels(db, sequelize);
  makeModelAssociations(db);
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

module.exports = { db, initializeDatabase };
