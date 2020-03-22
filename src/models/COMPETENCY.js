module.exports = function (sequelize, DataTypes) {
  const competency = sequelize.define(
    'Competency',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'COMPETENCY',
    },
  );
  return competency;
};
