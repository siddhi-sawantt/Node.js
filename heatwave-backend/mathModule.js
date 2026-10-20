// mathModule.js - Custom module for Heatwave mathematical calculations

// Function 1: Calculate Heat Index (Apparent Temperature in Celsius)
function calculateHeatIndex(temperatureC, humidity) {
    // Simplified Heat Index formula approximation
    const heatIndex = temperatureC + 0.5555 * (6.11 * Math.pow(10, (7.5 * temperatureC) / (237.7 + temperatureC)) - 10) * (humidity / 100);
    return parseFloat(heatIndex.toFixed(2));
}

// Function 2: Calculate Average Temperature from an array of readings
function calculateAverageTemp(tempArray) {
    if (!tempArray || tempArray.length === 0) return 0;
    const sum = tempArray.reduce((acc, curr) => acc + curr, 0);
    return parseFloat((sum / tempArray.length).toFixed(2));
}

// Function 3: Determine Heatwave Alert Category based on IMD threshold criteria
function getHeatwaveStatus(maxTemp) {
    if (maxTemp >= 45) return "CRITICAL ALERT: Severe Heatwave";
    if (maxTemp >= 40) return "WARNING: Heatwave Condition";
    return "NORMAL: Safe Temperature";
}

// Export functions using ES6 module / CommonJS export syntax
module.exports = {
    calculateHeatIndex,
    calculateAverageTemp,
    getHeatwaveStatus
};