module.exports = (sequelize, DataTypes) => {
  const EnforcementOffice = sequelize.define(
    'EnforcementOffice',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'ENFORCEMENT_OFFICE',
    },
  );
  return EnforcementOffice;
};
