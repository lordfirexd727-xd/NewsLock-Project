"use client";

import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "../components/NewsItem";
import Spinner from "./Spiner";

const News = ({
  country = "in",
  pageSize = 6,
  category = "sports",
  setProgress,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState("");

  const updateNews = useCallback(
    async (pageNo, append = false) => {
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      setProgress?.(10);

      try {
        const url =
          `/api/news?country=${country}` +
          `&category=${category}` +
          `&page=${pageNo}` +
          `&pageSize=${pageSize}`;
        setError("");
        const response = await fetch(url);
        setProgress?.(30);

        const data = await response.json();
        setProgress?.(70);

        if (!response.ok || data.status === "error") {
          throw new Error(data.message || "Failed to fetch news");
        }

        setArticles((previousArticles) => {
          const newArticles = data.articles || [];

          if (!append) {
            return newArticles;
          }

          const uniqueArticles = newArticles.filter(
            (newArticle) =>
              !previousArticles.some(
                (oldArticle) => oldArticle.url === newArticle.url,
              ),
          );

          return [...previousArticles, ...uniqueArticles];
        });

        setTotalResults(data.totalResults || 0);
        setPage(pageNo);
      } catch (error) {
        console.error("News fetch failed:", error);

        if (!append) {
          setArticles([]);
          setTotalResults(0);
        }

        setError("News is temporarily unavailable. Please try again later.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
        setProgress?.(100);
      }
    },
    [country, category, pageSize, setProgress],
  );

  // Initial load and category changes
  useEffect(() => {
    document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} - NewsLock`;

    updateNews(1);
  }, [category, updateNews]);

  const loadMoreNews = useCallback(async () => {
    const maxPage = Math.ceil(totalResults / pageSize);

    if (loading || loadingMore || page >= maxPage) {
      return;
    }

    await updateNews(page + 1, true);
  }, [loading, loadingMore, page, totalResults, pageSize, updateNews]);

  // Infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;

      if (nearBottom) {
        loadMoreNews();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreNews]);

  return (
    <div className="container my-2">
      <h1 className="text-center">NewsLock - Top {category} Headlines</h1>

      {loading && <Spinner />}
      {!loading && error && (
        <div className="alert alert-warning text-center" role="alert">
          <h5>📰 News temporarily unavailable</h5>
          <p className="mb-0">{error}</p>
        </div>
      )}

      <div className="row">
        {!loading &&
          articles.map((article) => (
            <div className="col-md-4" key={article.url} key2={article.url}>
              <NewsItem
                title={article.title?.slice(0, 45)}
                description={article.description?.slice(0, 88)}
                imageurl={article.urlToImage}
                Newsurl={article.url}
                author={article.author || "Unknown"}
                date={article.publishedAt?.slice(0, 10)}
                category={category}
              />
            </div>
          ))}
      </div>

      {loadingMore && <Spinner />}
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func,
};

export default News;
