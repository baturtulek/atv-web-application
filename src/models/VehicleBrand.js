module.exports = function (sequelize, DataTypes) {
  const vehicleBrand = sequelize.define(
    'VehicleBrand',
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
      tableName: 'VEHICLE_BRAND',
    },
  );
  return vehicleBrand;
};
