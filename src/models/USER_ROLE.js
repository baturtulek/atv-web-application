/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "USER_ROLE",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      role: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: ""
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "USER_ROLE"
    }
  );
};
