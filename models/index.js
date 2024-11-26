const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

const Profile = require('./Profile')(sequelize);
const Contract = require('./Contract')(sequelize);
const Job = require('./Job')(sequelize);

Profile.hasMany(Contract, { foreignKey: 'profileId' });
Contract.belongsTo(Profile, { foreignKey: 'profileId' });

Contract.hasMany(Job, { foreignKey: 'contractId' });
Job.belongsTo(Contract, { foreignKey: 'contractId' });

module.exports = { sequelize, Profile, Contract, Job };


