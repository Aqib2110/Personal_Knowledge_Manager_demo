import { getSession } from "@/lib/stripe";
import Link from "next/link";

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const {session_id} = await searchParams;
  if (!session_id) {
    return <p>Missing session ID</p>;
  }

  const session = await getSession(session_id);

  const customerEmail = session.customer_details?.email;
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-[60px]">
      <h1 className="text-center">Payment Successful 🎉</h1>

      <p className="text-center">
        Thank you for your purchase.
        <br />
        A confirmation email will be sent to{" "}
        {customerEmail ?? "your email"}.
      </p>

      <Link
        href="/"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Home
      </Link>
    </section>
  );
}