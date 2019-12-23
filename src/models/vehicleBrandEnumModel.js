module.exports = (Sequelize, DataTypes) => {
    const VehicleBrandEnum = Sequelize.define('VehicleBrandEnum', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        brand : {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
    return VehicleBrandEnum;
}