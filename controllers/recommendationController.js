const axios = require('axios');
const { getAccountBalances } = require('../services/binanceService');

const BASE_URL = 'https://testnet.binance.vision';

exports.getRecommendation = async (req, res) => {
  try {
    const balances = await getAccountBalances();
    const usdt = balances.find(b => b.asset === 'USDT');
    const available = usdt ? parseFloat(usdt.free) : 0;

    if (available === 0) {
      return res.json({ recommended: null, canBuy: false, reason: 'لا يوجد USDT كافٍ' });
    }

    const marketPrices = await axios.get(`${BASE_URL}/api/v3/ticker/price`);
    const usdtMarkets = marketPrices.data.filter(p => p.symbol.endsWith('USDT'));

    const affordable = usdtMarkets
      .map(p => ({ symbol: p.symbol, price: parseFloat(p.price) }))
      .filter(p => available >= p.price)
      .sort((a, b) => a.price - b.price);

    if (affordable.length === 0) {
      return res.json({ recommended: null, canBuy: false, reason: 'الرصيد لا يكفي لأي عملة' });
    }

    const top = affordable[0];
    return res.json({ recommended: top.symbol, price: top.price, canBuy: true });

  } catch (err) {
    res.status(500).json({ error: 'فشل التوصية الذكية', details: err.message });
  }
};
