module.exports = (Sequelize, DataTypes) => {
    const VehicleStateEnum = Sequelize.define('VehicleStateEnum', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        state : {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });
    return VehicleStateEnum;
}