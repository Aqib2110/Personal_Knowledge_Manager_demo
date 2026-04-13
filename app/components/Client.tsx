"use client";

import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { use } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Client({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
    const { plan } = use(searchParams);

  const fetchClientSecret = useCallback(async () => {

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({plan: plan})
    });

    const data = await res.json();

    if (!data.clientSecret) {
      throw new Error(data.error || "Missing clientSecret");
    }

    return data.clientSecret;
  }, []);

  return (
    <div className="min-h-screen pt-[60px]">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}