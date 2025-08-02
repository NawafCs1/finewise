process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const recommendationController = require('./controllers/recommendationController');
const marketController = require('./controllers/marketController');
const strController = require('./controllers/strController');
const coinController = require('./controllers/coinController');
const radarController = require('./controllers/radarController');



dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/recommendation', recommendationController.getRecommendation);
app.get('/api/market-table', marketController.getMarketTable);
app.get('/api/str', strController.getSmartRecommendation);
app.get('/api/coins', coinController.getCoins);
app.get('/api/radar', radarController.getRadarStatus);
app.listen(3009, () => {
  console.log('✅ Server running at http://localhost:3009');
});
app.use(express.static(path.join(__dirname, 'public')));
