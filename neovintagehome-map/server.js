// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = 3000;

app.use(express.static('public')); // serve frontend files

// Proxy endpoint to fetch KML (avoids CORS)
app.get('/kml', async (req, res) => {
  try {
    const kmlUrl = 'https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1T_TihQ5Qmy_rYiQdrJRSeIUtUOAHq-Q';
    const response = await fetch(kmlUrl);
    const text = await response.text();
    res.set('Content-Type', 'application/xml');
    res.send(text);
  } catch (err) {
    res.status(500).send('Error fetching KML');
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
