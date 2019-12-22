module.exports = (Sequelize, DataTypes) => {
const User = Sequelize.define('User', {
    // attributes
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING
      
    },
    email: {
        type: DataTypes.STRING,
      },
    token: {
        type: DataTypes.STRING,
      },
    identityNo: {
        type: DataTypes.STRING,
    },
    roleId: {
        type: DataTypes.INTEGER,
      },
    registrationTypeId: {
        type: DataTypes.INTEGER,
      },
    password: {
        type: DataTypes.STRING,
      },
  }, {
    // options
    timestamps: false,
    freezeTableName: true,
  });
  return User;
}