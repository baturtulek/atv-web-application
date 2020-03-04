/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'PARKING_LOT',
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
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
      },
      staffId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'USER',
          key: 'id',
        },
      },
      parkingTypeId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'PARKING_TYPE',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'PARKING_LOT',
    },
  );
};
