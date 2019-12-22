'use strict'

const Sequelize = require('sequelize');
const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

//Models/tables
db.User = require('../models/userModel')(connection, Sequelize);
db.Vehicle = require('../models/vehicleModel')(connection, Sequelize);
db.VehicleType = require('../models/vehicleTypeModel')(connection, Sequelize);

//Relations
db.VehicleType.belongsTo(db.Vehicle);
/*
db.comments.belongsTo(db.posts);
db.posts.hasMany(db.comments);
db.posts.belongsTo(db.users);
db.users.hasMany(db.posts);*/

module.exports = db;