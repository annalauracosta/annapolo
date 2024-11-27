const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Profile, Contract, Job } = require('./models');
const endpoints = require('./routes/endpoints');

const app = express();
app.use(bodyParser.json());
app.use('/api', endpoints);

const PORT = 3000;



async function syncDatabase() {

    try {

        console.log('Synchronizing database...');

        await sequelize.sync({ force: true });  

        console.log('Database synced successfully');

        await seedDatabase();

    } catch (error) {

        console.error('Error syncing the database:', error);

    }

}





async function seedDatabase() {
    try {
        
        const profile1 = await Profile.create({ name: 'John Doe', balance: 1000 });
        const profile2 = await Profile.create({ name: 'Jane Doe', balance: 500 }); 

        const contract1 = await Contract.create({ title: 'Contract A', profileId: profile1.id });
        const contract2 = await Contract.create({ title: 'Contract B', profileId: profile2.id });

        await Job.create({ description: 'Job 1', price: 500, paid: false, contractId: contract1.id });
        await Job.create({ description: 'Job 2', price: 300, paid: true, contractId: contract2.id });

        console.log('Test data inserted successfully.');
    } catch (error) {
        console.error('Error inserting test data:', error);
    }
}

async function startServer() {
    try {
        await syncDatabase();  
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
    }
}

startServer();
