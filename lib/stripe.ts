import Stripe from 'stripe'

// Allow app to run without Stripe keys for testing
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_demo_key'

export const stripe = stripeSecretKey.includes('demo')
    ? null
    : new Stripe(stripeSecretKey, {
        apiVersion: '2024-12-18.acacia',
        typescript: true,
    })

export const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY &&
    !process.env.STRIPE_SECRET_KEY.includes('your_stripe')
