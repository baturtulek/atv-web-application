module.exports = (sequelize, DataTypes) => {
  const UserLastLogin = sequelize.define(
    'UserLastLogin',
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

  UserLastLogin.associate = (models) => {
    models.UserLastLogin.hasOne(models.User, {
      foreignKey: 'id',
      sourceKey: 'userId',
    });
  };
  return UserLastLogin;
};
