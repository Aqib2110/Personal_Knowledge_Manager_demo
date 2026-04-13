import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
export async function POST(req:NextRequest) {
  const {plan}  = await req.json();
 if(!plan)
 {
    return NextResponse.json({
        error:"Plan is required"
    },{
        status:400
    })
 }
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ui_mode: "embedded_page",
      line_items: [
        {
          price: "price_1TLMjT2foiSgfYBFAtPVcGIx",
          quantity: 1,
        },
      ],
      return_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    });
    return NextResponse.json({
      clientSecret: session.client_secret,
    });
  
  } catch (err) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "error" },
      { status: 500 }
    );
  }
}