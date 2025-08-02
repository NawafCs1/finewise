const { getMarketStatus } = require('../services/binanceService');

exports.getRadarStatus = async (req, res) => {
  try {
    const status = await getMarketStatus();
    res.json({ status });
  } catch (err) {
    res.status(500).json({ error: 'فشل في جلب حالة السوق', details: err.message });
  }
};
