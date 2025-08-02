const crypto = require('crypto');
require('dotenv').config();

function signParams(params) {
  const query = new URLSearchParams(params).toString();
  const signature = crypto
    .createHmac('sha256', process.env.BINANCE_SECRET_KEY)
    .update(query)
    .digest('hex');
  return `${query}&signature=${signature}`;
}

module.exports = { signParams };
