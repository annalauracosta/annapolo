const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Profile', {
    name: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.FLOAT, defaultValue: 0 }
});
