module.exports = (Sequelize, DataTypes) => {
    const MobileVehicle = Sequelize.define('MobileVehicle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        plate: {
            type: DataTypes.STRING
        },
        addnotes: {
            type: DataTypes.STRING
        },
        staff: {
            type: DataTypes.STRING
        },
        parkingLot: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
    return MobileVehicle;
}