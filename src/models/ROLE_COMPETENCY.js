/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "ROLE_COMPETENCY",
    {
      roleId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "USER_ROLE",
          key: "id"
        }
      },
      competencyNo: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "COMPETENCY",
          key: "id"
        }
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "ROLE_COMPETENCY"
    }
  );
};
