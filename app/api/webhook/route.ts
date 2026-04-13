import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  const event = await req.json();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const plan = session.metadata.plan;
    const customerEmail = session.customer_email;

    await prisma.user.update({
      where: { email: customerEmail },
      data: {
       subscriptionStatus: plan,
      },
    });
  }

  return Response.json({ received: true });
}