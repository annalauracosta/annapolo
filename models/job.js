const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Job', {
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    paid: { type: DataTypes.BOOLEAN, defaultValue: false }
});
