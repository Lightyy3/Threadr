"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function TokenManager() {
  const [tokens, setTokens] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const searchParams = useSearchParams();

  const fetchTokens = async () => {
    try {
      const res = await fetch("/api/tokens");
      const data = await res.json();
      setTokens(data.tokens);
    } catch (error) {
      console.error("Error fetching tokens:", error);
      setTokens(null);
    }
  };

  useEffect(() => {
    const isSuccess = searchParams.get("success") === "true";
    if (isSuccess) {
      setShowSuccess(true);
    }
    fetchTokens();
  }, [searchParams]);

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

      {showSuccess && (
        <p className="text-green-600 font-semibold mb-4">
          ✅ Purchase successful! Tokens added.
        </p>
      )}

      <p className="text-black">
        You have <span className="font-semibold text-black">{tokens}</span>{" "}
        tokens left today.
      </p>

      {/* <button
        onClick={handleBuyTokens}
        disabled={loading}
        className="bg-[#8C3BFF] hover:bg-[#6a2acc] text-white font-semibold py-2 px-6 rounded-full transition"
      >
        {loading ? "Redirecting..." : "Buy 100 Tokens for $5"}
      </button> */}
    </div>
  );
}
