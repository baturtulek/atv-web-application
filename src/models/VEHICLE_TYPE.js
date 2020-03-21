/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'VEHICLE_TYPE',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(245),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(245),
        allowNull: false,
      },
      fee: {
        type: DataTypes.INTEGER(11),
        allowNull: true, // TODO: CONVERT TO FLOAT
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'VEHICLE_TYPE',
    },
  );
};
