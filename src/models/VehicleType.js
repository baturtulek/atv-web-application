module.exports = function(sequelize, DataTypes) {
  const vehicleType = sequelize.define(
    'VehicleType',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(245),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(245),
        allowNull: false,
      },
      fee: {
        type: DataTypes.INTEGER(11),
        allowNull: true, // TODO: CONVERT TO FLOAT
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'VEHICLE_TYPE',
    },
  );
  return vehicleType;
};
