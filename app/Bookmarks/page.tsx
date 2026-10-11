"use client";

import { useEffect, useState } from "react";
import NewsItem from "../../components/NewsItem";
import Navbar from "../../components/Navbar";

type Bookmark = {
  title: string;
  description: string;
  imageurl: string;
  url: string;
  author: string;
  date: string;
  category: string;
};

export default function Bookmarks() {
  const [articles, setArticles] = useState<Bookmark[]>([]);

  useEffect(() => {
    const saved: Bookmark[] = JSON.parse(
      localStorage.getItem("newsBookmarks") || "[]"
    );
    setArticles(saved);
  }, []);

  return (
    <div className="container my-4">
      <Navbar />
      <h1 className="text-center">Saved Bookmarks</h1>

      {articles.length === 0 ? (
        <p className="text-center mt-4">
          No bookmarks saved yet.
        </p>
      ) : (
        <div className="row">
          {articles.map((article) => (
            <div className="col-md-4" key={article.url}>
              <NewsItem
                title={article.title}
                description={article.description}
                imageurl={article.imageurl}
                Newsurl={article.url}
                author={article.author}
                date={article.date}
                category={article.category}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}