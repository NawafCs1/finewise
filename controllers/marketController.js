const axios = require('axios');

const BASE_URL = 'https://api.binance.com'; // نستخدم Binance الحقيقي لأسعار دقيقة

exports.getMarketTable = async (req, res) => {
  try {
    const marketRes = await axios.get(`${BASE_URL}/api/v3/ticker/24hr`);
    const list = marketRes.data.filter(item => item.symbol.endsWith('USDT')).slice(0, 20); // أول 20 عملة USDT

    const table = list.map(item => {
      const priceUSD = parseFloat(item.lastPrice);
      const priceSAR = (priceUSD * 3.75).toFixed(2);
      const change = parseFloat(item.priceChangePercent);
      const isUp = change >= 0;

      return {
        symbol: item.symbol,
        priceUSD,
        priceSAR: parseFloat(priceSAR),
        change24h: change,
        isUp
      };
    });

    res.json(table);
  } catch (err) {
    res.status(500).json({ error: 'فشل في جلب بيانات السوق', details: err.message });
  }
};
