const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Contract', {
    title: { type: DataTypes.STRING, allowNull: false }
});

