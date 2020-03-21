/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'TOW_FIRM',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      faxNumber: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      provinceCode: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      registrationDate: {
        type: 'TIMESTAMP',
        allowNull: true,
      },
      isActive: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'TOW_FIRM',
    },
  );
};
