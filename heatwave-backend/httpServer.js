// httpServer.js - Basic Node.js HTTP Server with FS Operations and Callbacks
const http = require('http');
const fs = require('fs');
const path = require('path');
const math = require('./mathModule');

const logFilePath = path.join(__dirname, 'heatwave_logs.txt');

// 1. SYNCHRONOUS File Operation: Write initial header synchronously
try {
    fs.writeFileSync(logFilePath, '--- IMD HEATWAVE MONITORING LOGS ---\n', 'utf8');
    console.log('[SYNC FS] Log file initialized synchronously.');
} catch (err) {
    console.error('[SYNC FS Error]', err);
}

// Create HTTP Server
const server = http.createServer((req, res) => {
    const timeStamp = new Date().toISOString();

    // 2. ASYNCHRONOUS File Operation with Callback
    const logMessage = `[${timeStamp}] Request received for URL: ${req.url}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) console.error('[ASYNC FS Error]', err);
        else console.log('[ASYNC FS Callback] Request logged asynchronously.');
    });

    // 3. Basic HTTP Routing
    if (req.url === '/' || req.url === '/home') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>IMD Climate Intelligence System</h1><p>Node.js Native HTTP Server Running.</p>');
    }
    else if (req.url === '/api/heatwave') {
        // Demonstrating JSON response and custom module usage
        const sampleTemps = [41.2, 42.5, 43.0, 40.8];
        const avgTemp = math.calculateAverageTemp(sampleTemps);
        const status = math.getHeatwaveStatus(avgTemp);

        const heatData = {
            region: "Mumbai-Pune Region",
            averageTemperature: avgTemp,
            status: status,
            heatIndex: math.calculateHeatIndex(42.5, 65)
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(heatData));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Page Not Found</h1>');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`HTTP Server running at http://localhost:${PORT}`);
});