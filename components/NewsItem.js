
"use client";
import React, { useEffect, useState } from "react";

const NewsItem = (props) => {
  const {
    title,
    description,
    imageurl,
    Newsurl,
    author,
    date,
    category,
  } = props;

  const [bookmarked, setBookmarked] = useState(false);

  const defaultImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ62mZn-g_FDVhNAYwqwPoESQG3SPPdwb3tqGphpeBmbQ&s=10";

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("newsBookmarks") || "[]");
    setBookmarked(saved.some((article) => article.url === Newsurl));
  }, [Newsurl]);

  const toggleBookmark = () => {
    const saved = JSON.parse(localStorage.getItem("newsBookmarks") || "[]");

    if (saved.some((article) => article.url === Newsurl)) {
      const updated = saved.filter((article) => article.url !== Newsurl);
      localStorage.setItem("newsBookmarks", JSON.stringify(updated));
      setBookmarked(false);
    } else {
      saved.push({
        title,
        description,
        imageurl,
        url: Newsurl,
        author,
        date,
        category,
      });

      localStorage.setItem("newsBookmarks", JSON.stringify(saved));
      setBookmarked(true);
    }
  };

  return (
    <div className="my-3">
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={imageurl || defaultImage}
          alt={title || "News image"}
          className="card-img-top"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultImage;
          }}
        />

        <div className="card-body">
          <h5 className="card-title">
            {title}
            <span className="badge text-bg-primary ms-2">{category}</span>
          </h5>

          <p className="card-text">{description}...</p>

          <p className="card-text">
            <small className="text-body-secondary">
              By {author} on {date}
            </small>
          </p>

          <a
            href={Newsurl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary me-2"
          >
            Read More
          </a>

          <button
            type="button"
            className={`btn ${bookmarked ? "btn-warning" : "btn-outline-warning"}`}
            onClick={toggleBookmark}
          >
            {bookmarked ? "★ Saved" : "☆ Bookmark"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
