module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define(
    'Announcement',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      isActive: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      endDate: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      isFlash: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
      },
      showAt: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      typeId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      languageId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'ANNOUNCEMENT',
    },
  );

  Announcement.associate = (DB) => {
    DB.Announcement.belongsTo(DB.UserRole, {
      foreignKey: 'id',
      sourceKey: 'roleId',
    });
  };
  return Announcement;
};
