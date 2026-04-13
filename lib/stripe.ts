import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export async function getSession(session_id: string) {
  return stripe.checkout.sessions.retrieve(session_id);
}