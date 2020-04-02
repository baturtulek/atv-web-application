const fs = require('fs');
const path = require('path');

exports.loadModels = (db, sequelize) => {
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

exports.makeModelAssociations = (db) => {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};
