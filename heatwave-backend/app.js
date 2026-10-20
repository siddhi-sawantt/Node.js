// app.js - Express Server with In-Memory MongoDB
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const path = require('path');
const math = require('./mathModule');
const HeatwaveData = require('./models/HeatwaveData');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize In-Memory MongoDB Server automatically
async function startServer() {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    console.log('Connected to In-Memory MongoDB successfully!');

    // Pre-seed initial sample data
    await HeatwaveData.create({
        region: 'Mumbai-Pune Region',
        stationId: 'AWS-MUM-01',
        temperature: 42.5,
        humidity: 55,
        heatIndex: math.calculateHeatIndex(42.5, 55),
        status: math.getHeatwaveStatus(42.5)
    });

    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Express Server running on http://localhost:${PORT}`);
    });
}

// REST CRUD Routes
app.post('/api/heatwave', async (req, res) => {
    try {
        const { region, stationId, temperature, humidity } = req.body;
        const newRecord = await HeatwaveData.create({
            region,
            stationId,
            temperature,
            humidity,
            heatIndex: math.calculateHeatIndex(temperature, humidity),
            status: math.getHeatwaveStatus(temperature)
        });
        res.status(201).json({ message: 'Heatwave record created successfully', data: newRecord });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/heatwave', async (req, res) => {
    const records = await HeatwaveData.find();
    res.json(records);
});

app.get('/dashboard', async (req, res) => {
    const records = await HeatwaveData.find();
    res.render('dashboard', { title: 'Heatwave Early Warning Dashboard', records });
});

startServer();