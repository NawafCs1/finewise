const { getCoinData } = require('../services/binanceService');

exports.getCoins = async (req, res) => {
  try {
    const coins = await getCoinData();
    res.json(coins);
  } catch (err) {
    res.status(500).json({ error: 'فشل في جلب العملات', details: err.message });
  }
};
