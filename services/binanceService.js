const axios = require('axios');

const getCoinData = async () => {
  const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'XRPUSDT'];
  const exchangeRate = 3.75;

  const results = await Promise.all(symbols.map(async (symbol) => {
    const res = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`);
    const price = parseFloat(res.data.lastPrice);
    const change = parseFloat(res.data.priceChangePercent);
await axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');

    return {
      symbol: symbol.replace('USDT', ''),
      price_usd: price,
      price_sar: +(price * exchangeRate).toFixed(2),
      change_percent: change,
      status: change > 3 ? '📈 مرتفعة' : change < -3 ? '📉 منخفضة' : '⚖️ مستقرة'
    };
  }));

  return results;
};

const getMarketStatus = async () => {
  const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
  const change = parseFloat(res.data.priceChangePercent);
  if (change > 4) return '🚀 فرصة شرائية ممتازة';
  if (change < -4) return '⚠️ السوق هابط بشدة';
  return '📊 السوق مستقر';
};

module.exports = { getCoinData, getMarketStatus };
