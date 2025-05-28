const stripe = require('stripe')

require('dotenv').config()

const Stripe = stripe(process.env.STRIPE_API_KEY)
module.exports = Stripe

