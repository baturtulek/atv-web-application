module.exports = function (sequelize, DataTypes) {
  const UserRole = sequelize.define(
    'UserRole',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING(45),
        allowNull: false,
        defaultValue: '',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'USER_ROLE',
    },
  );
  return UserRole;
};
