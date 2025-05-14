"use client";

import { useEffect, useState } from "react";

export default function TokenManager() {
  const [tokens, setTokens] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/tokens/tokens")
      .then((res) => res.json())
      .then((data) => setTokens(data.tokens))
      .catch(() => setTokens(null));
  }, []);

  const handleBuyTokens = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4 text-black">Token Balance</h2>
      <p className="text-gray-700 text-lg mb-6">
        {tokens !== null ? `You have ${tokens} tokens` : "Loading..."}
      </p>
      <button
        onClick={handleBuyTokens}
        disabled={loading}
        className="bg-[#8C3BFF] hover:bg-[#6a2acc] text-white font-semibold py-2 px-6 rounded-full transition"
      >
        {loading ? "Redirecting..." : "Buy 100 Tokens for $5"}
      </button>
    </div>
  );
}
