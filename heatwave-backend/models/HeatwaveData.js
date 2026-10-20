// models/HeatwaveData.js - MongoDB Schema & Model for Heatwave Observations
const mongoose = require('mongoose');

const heatwaveSchema = new mongoose.Schema({
    region: {
        type: String,
        required: true
    },
    stationId: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    heatIndex: {
        type: Number
    },
    status: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('HeatwaveData', heatwaveSchema);