module.exports = (Sequelize, DataTypes) =>  {
    const VehicleType = Sequelize.define('VehicleType', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        type : {
            type: DataTypes.STRING
        },
        price : {
            type: DataTypes.STRING
        },
        brand : {
            type: DataTypes.STRING
        },
        color : {
            type: DataTypes.STRING
        },
        year : {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false,
        freezeTableName: true,
    });
    /*VehicleType.associate = (models) => {
        VehicleType.belongsTo(models.Vehicle, {foreignKey: '', as: ''})
    }*/
    return VehicleType;
}