module.exports = (sequelize, DataTypes) => {
  const VehicleColor = sequelize.define(
    'VehicleColor',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'VEHICLE_COLOR',
    },
  );
  return VehicleColor;
};
