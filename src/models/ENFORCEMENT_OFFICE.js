/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'ENFORCEMENT_OFFICE',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'ENFORCEMENT_OFFICE',
    },
  );
};
