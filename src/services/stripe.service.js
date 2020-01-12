const Stripe = require('stripe');
const { STRIPE_KEY } = require('../config/config');

const stripe = Stripe(STRIPE_KEY);

module.exports = {
  stripe,
};
