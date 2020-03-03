/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'USER_LAST_LOGIN',
    {
      userId: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
      },
      ip: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      lastLogin: {
        type: 'TIMESTAMP',
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'USER_LAST_LOGIN',
    },
  );
};
