module.exports = (Sequelize, DataTypes) => {
    const ParkingLotTypeEnum = Sequelize.define('ParkingLotTypeEnum', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
    return ParkingLotTypeEnum;
}