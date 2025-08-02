const axios = require('axios');

exports.getSmartRecommendation = async (req, res) => {
  try {
    const { amount } = req.query;
    const sarAmount = parseFloat(amount);
    if (isNaN(sarAmount)) return res.status(400).json({ error: 'قيمة غير صالحة' });

    const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
    const priceChangePercent = parseFloat(response.data.priceChangePercent);

    let suggestedPercent = 25;
    let status = 'استقرار السوق';

    if (priceChangePercent > 3) {
      suggestedPercent = 60;
      status = 'صعود قوي';
    } else if (priceChangePercent > 0.5) {
      suggestedPercent = 35;
      status = 'صعود متوسط';
    } else if (priceChangePercent < -0.5) {
      suggestedPercent = 10;
      status = 'هبوط ملحوظ';
    }

    const suggestedAmount = Math.round((suggestedPercent / 100) * sarAmount);

    res.json({
      status,
      suggestedPercentage: suggestedPercent,
      suggestedAmount,
      currency: 'BTC'
    });
  } catch (err) {
    res.status(500).json({ error: 'فشل في تحليل السوق', details: err.message });
  }
};
