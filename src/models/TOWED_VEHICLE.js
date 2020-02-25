/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "TOWED_VEHICLE",
    {
      plate: {
        type: DataTypes.STRING(12),
        allowNull: false,
        primaryKey: true
      },
      towedDate: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      note: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      staffId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "USER",
          key: "id"
        }
      },
      parkingLotId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "PARKING_LOT",
          key: "id"
        }
      },
      stateId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "VEHICLE_STATE",
          key: "id"
        }
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "TOWED_VEHICLE"
    }
  );
};
