/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "PARKING_TYPE",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      description: {
        type: DataTypes.STRING(245),
        allowNull: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "PARKING_TYPE"
    }
  );
};
