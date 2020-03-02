/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'USER',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(90),
        allowNull: false,
      },
      tcNo: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      registrationTypeId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      ipAddress: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'USER',
    },
  );
};
