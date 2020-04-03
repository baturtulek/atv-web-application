const fs = require('fs');
const path = require('path');

exports.loadModels = (DB, sequelize) => {
  const filename = path.basename(__filename);
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (file !== filename);
    })
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      DB[model.name] = model;
    });
};

exports.makeModelAssociations = (DB) => {
  Object.keys(DB).forEach((modelName) => {
    if (DB[modelName].associate) {
      DB[modelName].associate(DB);
    }
  });
};
