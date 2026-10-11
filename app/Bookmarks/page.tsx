
"use client";

import { useEffect, useState } from "react";
import NewsItem from "../../components/NewsItem";
import Navbar from "../../components/Navbar";
import { jsx } from "react/jsx-runtime";

export default function Bookmarks() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("newsBookmarks") || "[]"
    );
    setArticles(saved);
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center">Saved Bookmarks</h1>
     <Navbar />
      {articles.length === 0 ? (
        <p className="text-center mt-4">
          No bookmarks saved yet.
        </p>
      ) : (
        <div className="row">
          {articles.map((article) => (
            <div className="col-md-4" key={article.url}>
                <Navbar />
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