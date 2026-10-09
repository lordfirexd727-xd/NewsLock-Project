
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category") || "general";
  const country = searchParams.get("country") || "us";
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "8";

  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 500 }
    );
  }

  const url = new URL("https://newsapi.org/v2/top-headlines");
  url.searchParams.set("country", country);
  url.searchParams.set("category", category);
  url.searchParams.set("page", page);
  url.searchParams.set("pageSize", pageSize);
  url.searchParams.set("apiKey", apiKey);

  const response = await fetch(url.toString(), {
    cache: "no-store",
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
