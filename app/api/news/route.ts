
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category") || "general";
    const country = searchParams.get("country") || "in";
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const pageSize = Math.min(
      Math.max(Number(searchParams.get("pageSize")) || 6, 1),
      10
    );

    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { status: "error", message: "GNews API key is missing" },
        { status: 500 }
      );
    }

    const url = new URL("https://gnews.io/api/v4/top-headlines");

    url.searchParams.set("apikey", apiKey);
    url.searchParams.set("country", country);
    url.searchParams.set("lang", "en");
    url.searchParams.set("category", category);
    url.searchParams.set("max", String(pageSize));
    url.searchParams.set("page", String(page));

    const response = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });

    const data = await response.json();

    if (!response.ok || data.errors) {
      return NextResponse.json(
        {
          status: "error",
          message: data.errors
            ? JSON.stringify(data.errors)
            : "GNews request failed",
        },
        { status: response.status || 502 }
      );
    }

    const articles = (data.articles || [])
      .map(
        (article: {
          title?: string;
          description?: string | null;
          image?: string | null;
          url?: string;
          source?: { name?: string };
          publishedAt?: string;
          content?: string | null;
        }) => ({
          source: {
            id: null,
            name: article.source?.name || "Unknown",
          },
          author: article.source?.name || "Unknown",
          title: article.title || "Untitled",
          description: article.description || "",
          url: article.url || "",
          urlToImage: article.image || null,
          publishedAt: article.publishedAt || null,
          content: article.content || null,
        })
      )
      .filter((article: { url: string }) => Boolean(article.url));

    return NextResponse.json({
      status: "ok",
      totalResults: data.totalArticles ?? articles.length,
      articles,
    });
  } catch (error) {
    console.error("GNews request failed:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Unable to fetch news right now",
      },
      { status: 500 }
    );
  }
}
