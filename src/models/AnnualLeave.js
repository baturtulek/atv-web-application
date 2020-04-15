module.exports = (sequelize, DataTypes) => {
  const AnnualLeave = sequelize.define(
    'AnnualLeave',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      numberOfDays: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      startDate: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      endDate: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'ANNUAL_LEAVE',
    },
  );
  return AnnualLeave;
};
