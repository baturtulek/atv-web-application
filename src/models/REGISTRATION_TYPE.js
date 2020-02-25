/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "REGISTRATION_TYPE",
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
      tableName: "REGISTRATION_TYPE"
    }
  );
};
