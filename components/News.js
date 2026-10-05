"use client";
import React, { Component } from "react";
import NewsItem from "../components/NewsItem";
import Spinner from "./Spiner";
import PropTypes from 'prop-types'



export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "sports"
  };
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  
  constructor() {
    super();

 this.state = {
  articles: [],
  loading: true,
  page: 1,
  totalResults: 0,
  pageSize: 8
};
  }
  
 async updateNews(pageNo) {
   const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5e24d783d69b4823b913b256d5c65e30&page=${pageNo}&pageSize=${this.state.pageSize}`;
       this.setState({ loading: true });

    let data = await fetch(url);
    let passeddata = await data.json();

    console.log(passeddata);

    this.setState({
    articles: passeddata.articles || [],
    totalResults: passeddata.totalResults || 0,
    loading: false
 }
);
  };

  async componentDidMount() {
    this.updateNews(this.state.page);
  }

handleprevclick = async () => {

this.setState({page: this.state.page - 1});
   this.updateNews();

};

handlenextclick = async () => {
this.setState({page: this.state.page + 1});
   this.updateNews();

};

  render() {
let maxPage = Math.ceil(
  this.state.totalResults / this.state.pageSize
);
    return (
      <div className="container my-2">
        <h1 className="text-center">NewsLock - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?.slice(0, 45) } 
                  description={element.description?.slice(0, 88)}
                  imageurl={element.urlToImage}
                  Newsurl={element.url}
                  author={element.author || "Unknown"}
                  date={element.publishedAt.slice(0, 10)}
                  category={this.props.category}
                />
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevclick}
          >
            &larr; Previous
          </button>
<span>
  Page {this.state.page} / {maxPage}
</span>
         <button
 disabled={this.state.page >= maxPage}
  type="button"
  className="btn btn-dark"
  onClick={this.handlenextclick}
>
  Next &rarr;
</button>
        </div>
      </div>
      
    );
  }
}

export default News;