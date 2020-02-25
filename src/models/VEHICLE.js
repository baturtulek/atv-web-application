/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "VEHICLE",
    {
      plate: {
        type: DataTypes.STRING(12),
        allowNull: false,
        defaultValue: "",
        primaryKey: true
      },
      chassisNo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ""
      },
      trusteeNo: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: ""
      },
      vehicleTypeId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "VEHICLE_TYPE",
          key: "id"
        }
      },
      engineNo: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      colorId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "VEHICLE_COLOR",
          key: "id"
        }
      },
      modelYear: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      bodyTypeId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "VEHICLE_BODY_STYLE",
          key: "id"
        }
      },
      brandId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "VEHICLE_BRAND",
          key: "id"
        }
      },
      ownerProfileId: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "VEHICLE"
    }
  );
};
