/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";

    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: "us",
        pageSize: 5,
        page,
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
      },
      headers: {
        "User-Agent": "Next.js App",
      },
    });

    return NextResponse.json({
      articles: response.data.articles,
      totalResults: response.data.totalResults,
    });
  } catch (error: any) {
    console.error("Server Error fetching news:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
