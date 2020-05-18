module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define(
    'Announcement',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
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
      content: {
        type: DataTypes.TEXT,
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

  };
  return Announcement;
};
