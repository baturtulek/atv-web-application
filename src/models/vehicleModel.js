module.exports = (Sequelize, DataTypes) => {
    const Vehicle = Sequelize.define('Vehicle', {
        licensePlate: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        chassisNo: {
            type: DataTypes.STRING
        },
        engineNo: {
            type: DataTypes.STRING
        },
        trusteeNo: {
            type: DataTypes.INTEGER
        },
        entranceDate: {
            type: DataTypes.DATE
        },
        exitDate: {
            type: DataTypes.DATE
        },
        stateId: {
            type: DataTypes.INTEGER
        },
        parkingLotId: {
            type: DataTypes.INTEGER
        }
    }, {
        timeStamps: false
    });
    return Vehicle;
}