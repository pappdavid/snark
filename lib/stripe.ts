import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2024-06-20',
})

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    reviewsPerMonth: 3,
    features: ['3 reviews/month', 'Basic snark', 'GitHub integration'],
  },
  pro: {
    name: 'Pro',
    price: 1200,
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? '',
    reviewsPerMonth: Infinity,
    features: ['Unlimited reviews', 'Full snark control', 'Inline comments', 'Therapy recommendations'],
  },
  team: {
    name: 'Team',
    price: 4900,
    priceId: process.env.STRIPE_TEAM_PRICE_ID ?? '',
    reviewsPerMonth: Infinity,
    features: ['10 seats', 'Everything in Pro', 'Team leaderboard', 'Slack notifications'],
  },
}

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  plan: string,
  userId: string
) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    metadata: { plan, userId },
  })
}

export async function createOrRetrieveCustomer(email: string, name?: string) {
  const customers = await stripe.customers.list({ email, limit: 1 })
  if (customers.data.length > 0) return customers.data[0]
  return stripe.customers.create({ email, name })
}
