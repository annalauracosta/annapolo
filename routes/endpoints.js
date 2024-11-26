const express = require('express');
const bodyParser = require('body-parser');
const { Profile, Contract, Job } = require('../models');  
const router = express.Router();

router.use(bodyParser.json());

router.get('/contracts/:profileId', async (req, res) => {
    const { profileId } = req.params;
    try {
        const contracts = await Contract.findAll({ where: { profileId } });

        if (!contracts.length) {
            return res.status(404).json({ message: `No contracts found for profile ID ${profileId}.` });
        }

        res.json({ message: 'Contracts retrieved successfully.', contracts });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving contracts.' });
    }
});

router.post('/deposit/:profileId', async (req, res) => {
    const { profileId } = req.params;
    let { amount } = req.body;

    console.log('Received amount:', amount);  

    amount = parseFloat(amount);

    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({
            message: `Deposit not processed. Amount must be a positive number. Received: ${amount || 'null'}.`,
        });
    }

    try {
        
        const profile = await Profile.findByPk(profileId);

        
        if (!profile) {
            return res.status(404).json({
                message: `Deposit not processed. Profile with ID ${profileId} does not exist.`,
            });
        }

        profile.balance += amount;
        await profile.save();

        res.json({
            message: `Deposit of ${amount} successfully added to profile ${profile.name}.`,
            profile,
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the deposit.' });
    }
});




router.get('/jobs/unpaid/:contractId', async (req, res) => {
    const { contractId } = req.params;
    try {
        const jobs = await Job.findAll({
            where: { contractId, paid: false },  
        });

        if (!jobs.length) {
            return res.status(404).json({ message: `No unpaid jobs found for contract ID ${contractId}.` });
        }

        res.json({ message: 'Unpaid jobs retrieved successfully.', jobs });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving jobs.' });
    }
});

module.exports = router;
