module.exports = (Sequelize, DataTypes) => {
    const VehicleColorEnum = Sequelize.define('VehicleColorEnum', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        color : {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
    return VehicleColorEnum;
}