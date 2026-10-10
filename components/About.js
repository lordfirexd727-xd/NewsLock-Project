
import React from "react";

const About = ({ mode = "light" }) => {
  const isDark = mode === "black";

  const items = [
    {
      id: "one",
      title: "What is NewsLock?",
      content:
        "NewsLock is a news browsing website that brings headlines from different categories into one place. It helps readers explore the latest available news and open full articles from their original sources.",
    },
    {
      id: "two",
      title: "Features of NewsLock",
      content:
        "NewsLock lets you explore categories such as Business, Entertainment, General, Health, Science, Sports, and Technology. It also supports browsing news through article cards and loading more articles as you scroll.",
    },
    {
      id: "three",
      title: "Technology & Purpose",
      content:
        "NewsLock is built with React and Next.js, with Bootstrap for the interface and an API route for fetching news. This project is also a hands-on way to learn components, hooks, routing, API integration, and responsive web design.",
    },
    {
  id: "creator",
  title: "Who Created NewsLock?",
  content:
    "NewsLock was created by Kunal Kashyap as a personal web development project. Built with React, Next.js, and Bootstrap, this project reflects his journey of learning modern web development and building useful applications. The goal is to make browsing news simple and convenient while continuing to improve the platform with new features.",
},
  ];

  return (
    <div
      className="container my-5"
      style={{
        backgroundColor: isDark ? "#212529" : "#ffffff",
        color: isDark ? "#ffffff" : "#212529",
        minHeight: "70vh",
        padding: "24px",
        borderRadius: "12px",
      }}
    >
      <h1 className="text-center mb-3">About NewsLock</h1>

      <p className="text-center mb-4">
        Stay informed. Explore the stories that matter.
      </p>

      <div className="accordion" id="newsLockAccordion">
        {items.map((item, index) => (
          <div
            className="accordion-item"
            key={item.id}
            style={{
              backgroundColor: isDark ? "#212529" : "#ffffff",
              color: isDark ? "#ffffff" : "#212529",
            }}
          >
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${
                  index !== 0 ? "collapsed" : ""
                }`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#newsLock-${item.id}`}
                aria-expanded={index === 0}
                aria-controls={`newsLock-${item.id}`}
                style={{
                  backgroundColor: isDark ? "#343a40" : "#f8f9fa",
                  color: isDark ? "#ffffff" : "#212529",
                }}
              >
                {item.title}
              </button>
            </h2>

            <div
              id={`newsLock-${item.id}`}
              className={`accordion-collapse collapse ${
                index === 0 ? "show" : ""
              }`}
              data-bs-parent="#newsLockAccordion"
            >
              <div className="accordion-body">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
