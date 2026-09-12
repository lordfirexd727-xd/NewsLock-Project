import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, Newsurl } = this.props;

    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          
          <img
            src={imageurl}
            alt={title}
            className="card-img-top"
          />

          <div className="card-body">
            <h5 className="card-title">{title} ...</h5>

            <p className="card-text">
              {description} ...
            </p>

            <a href={Newsurl} target="_blank" className="btn btn-primary">
              Read More
            </a>
          </div>

        </div>
      </div>
    );
  }
}

export default NewsItem;