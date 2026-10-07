"use client";

import React, { Component } from "react";
import NewsItem from "../components/NewsItem";
import Spinner from "./Spiner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "sports",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      loadingMore: false,
      page: 1,
      totalResults: 0,
      pageSize: 8,
    };
  }

  handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200 &&
      !this.state.loadingMore &&
      this.state.page <
        Math.ceil(this.state.totalResults / this.state.pageSize)
    ) {
      this.loadMoreNews();
    }
  };

  async updateNews(pageNo, append = false) {
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}` +
      `&category=${this.props.category}` +
      `&apiKey=5e24d783d69b4823b913b256d5c65e30` +
      `&page=${pageNo}` +
      `&pageSize=${this.state.pageSize}`;

    if (!append) {
      this.setState({ loading: true });
    }

    const data = await fetch(url);
    const passeddata = await data.json();

    console.log(passeddata);

    this.setState({
      articles: append
        ? [...this.state.articles, ...(passeddata.articles || [])]
        : passeddata.articles || [],
      totalResults: passeddata.totalResults || 0,
      loading: false,
      loadingMore: false,
    });
  }

  async componentDidMount() {
    document.title = `${this.props.category} - NewsLock`;

    await this.updateNews(1);

    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      let category = this.props.category;

      category =
        category.slice(0, 1).toUpperCase() +
        category.slice(1);

      document.title = `${category} - NewsLock`;
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleprevclick = () => {
    let prevPage = this.state.page - 1;

    this.setState({
      page: prevPage,
    });

    this.updateNews(prevPage);
  };

  handlenextclick = () => {
    let nextPage = this.state.page + 1;

    this.setState({
      page: nextPage,
    });

    this.updateNews(nextPage);
  };

  loadMoreNews = async () => {
    let nextPage = this.state.page + 1;

    this.setState({
      page: nextPage,
      loadingMore: true,
    });

    await this.updateNews(nextPage, true);
  };

  render() {
    let maxPage = Math.ceil(
      this.state.totalResults / this.state.pageSize
    );

    return (
      <div className="container my-2">

        <h1 className="text-center">
          NewsLock - Top {this.props.category} Headlines
        </h1>

        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title?.slice(0, 45)}
                    description={element.description?.slice(0, 88)}
                    imageurl={element.urlToImage}
                    Newsurl={element.url}
                    author={element.author || "Unknown"}
                    date={element.publishedAt?.slice(0, 10)}
                    category={this.props.category}
                  />
                </div>
              );
            })}
        </div>

        {this.state.loadingMore && <Spinner />}

        <div className="d-flex justify-content-between mt-3">


        </div>
      </div>
    );
  }
}

export default News;