module.exports = (sequelize, DataTypes) => {
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

  RoleCompetency.associate = (db) => {
    db.RoleCompetency.hasMany(db.UserRole, {
      foreignKey: 'id',
      sourceKey: 'roleId',
    });
    db.RoleCompetency.hasMany(db.Competency, {
      foreignKey: 'id',
      sourceKey: 'competencyNo',
    });
  };
  return RoleCompetency;
};
