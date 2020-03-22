module.exports = function (sequelize, DataTypes) {
  const roleCompetency = sequelize.define(
    'RoleCompetency',
    {
      roleId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'USER_ROLE',
          key: 'id',
        },
      },
      competencyNo: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'COMPETENCY',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'ROLE_COMPETENCY',
    },
  );
  return roleCompetency;
};
