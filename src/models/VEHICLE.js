module.exports = function (sequelize, DataTypes) {
  const Vehicle = sequelize.define(
    'Vehicle',
    {
      plate: {
        type: DataTypes.STRING(12),
        allowNull: false,
        defaultValue: '',
        primaryKey: true,
      },
      chassisNo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      trusteeNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
      },
      vehicleTypeId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      engineNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      colorId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      modelYear: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      bodyTypeId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      brandId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      ownerProfileId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'VEHICLE',
    },
  );

  Vehicle.associate = function (models) {
    models.Vehicle.hasOne(models.VehicleType, {
      foreignKey: 'id',
      sourceKey: 'vehicleTypeId',
    });
    models.Vehicle.hasOne(models.VehicleColor, {
      foreignKey: 'id',
      sourceKey: 'colorId',
    });
    models.Vehicle.hasOne(models.VehicleBodyStyle, {
      foreignKey: 'id',
      sourceKey: 'bodyTypeId',
    });
    models.Vehicle.hasOne(models.VehicleBrand, {
      foreignKey: 'id',
      sourceKey: 'brandId',
    });
    models.Vehicle.hasMany(models.TowedVehicle, {
      foreignKey: 'plate',
      sourceKey: 'plate',
    });
  };
  return Vehicle;
};
