# Stripe Payment Integration Setup

## 🎯 Overview
Your FoodieGo app now has Stripe payment integration! Customers can pay securely with credit cards, debit cards, and other payment methods.

## 📋 Setup Instructions

### 1. Get Stripe API Keys

1. **Sign up for Stripe** (if you haven't already):
   - Go to https://stripe.com
   - Create a free account

2. **Get your API keys**:
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Copy your **Secret key** (starts with `sk_test_`)

### 2. Update Environment Variables

Update your `.env` file with your Stripe keys:

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Important**: 
- Use **test keys** for development (they start with `pk_test_` and `sk_test_`)
- Never commit your `.env` file to git
- For production, use live keys (start with `pk_live_` and `sk_live_`)

### 3. Test Cards

Use these test card numbers in development:

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Visa - Success |
| 4000 0000 0000 9995 | Visa - Declined |
| 5555 5555 5555 4444 | Mastercard - Success |

- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

## 🚀 How It Works

### Payment Flow:

1. **Add to Cart** → User adds items to cart
2. **Checkout** → User fills in delivery details
3. **Place Order** → Payment modal opens
4. **Enter Card** → User enters payment details
5. **Process Payment** → Stripe processes the payment
6. **Create Order** → Order is saved to database
7. **Confirmation** → User is redirected to orders page

### Files Created:

- `lib/stripe.ts` - Stripe configuration
- `app/api/create-payment-intent/route.ts` - API to create payment intents
- `components/payment-modal.tsx` - Payment UI component
- Updated `components/cart-modal.tsx` - Integrated payment flow

## 💳 Features

✅ **Secure Payments** - PCI-compliant payment processing
✅ **Multiple Payment Methods** - Credit cards, debit cards, etc.
✅ **Real-time Validation** - Instant card validation
✅ **Mobile Responsive** - Works on all devices
✅ **Error Handling** - Clear error messages
✅ **Loading States** - Visual feedback during processing

## 🧪 Testing

1. Start your dev server: `npm run dev`
2. Add items to cart
3. Click "Proceed to Checkout"
4. Fill in delivery details
5. Click "Place Order"
6. Use test card: `4242 4242 4242 4242`
7. Complete payment

## 📊 View Payments in Stripe Dashboard

- Go to https://dashboard.stripe.com/test/payments
- See all test payments
- View payment details, refunds, etc.

## 🔒 Security Notes

- Stripe handles all sensitive card data
- Your app never sees or stores card numbers
- All payments are encrypted
- PCI compliance is handled by Stripe

## 🌐 Production Deployment

When deploying to production:

1. Get **live** Stripe keys from dashboard
2. Update environment variables on your hosting platform
3. Test thoroughly with real cards (small amounts)
4. Enable webhook endpoints for order status updates

## 📚 Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Dashboard](https://dashboard.stripe.com)

---

**Need Help?** Check the Stripe docs or contact support at https://support.stripe.com
