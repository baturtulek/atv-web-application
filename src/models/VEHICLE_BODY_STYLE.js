/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "VEHICLE_BODY_STYLE",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ""
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "VEHICLE_BODY_STYLE"
    }
  );
};
