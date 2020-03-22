module.exports = function (sequelize, DataTypes) {
  const RoleCompetency = sequelize.define(
    'RoleCompetency',
    {
      roleId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      competencyNo: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'ROLE_COMPETENCY',
    },
  );

  RoleCompetency.associate = function (models) {
    models.RoleCompetency.hasMany(models.UserRole, {
      foreignKey: 'id',
      sourceKey: 'roleId',
    });
    models.RoleCompetency.hasMany(models.Competency, {
      foreignKey: 'id',
      sourceKey: 'competencyNo',
    });
  };
  return RoleCompetency;
};
