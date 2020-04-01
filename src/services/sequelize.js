const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const chalk = require('chalk');
const dbConfig = require('../config/dbConfig')[process.env.NODE_ENV];

const db = {};
db.Sequelize = Sequelize;
const sequelize = new Sequelize(dbConfig);

const initializeDatabase = () => {
  loadModels();
  makeModelAssociations();
  serve();
};

const loadModels = () => {
  fs.readdirSync('./src/models')
    .forEach((file) => {
      const model = sequelize.import(path.join('../models/', file));
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
