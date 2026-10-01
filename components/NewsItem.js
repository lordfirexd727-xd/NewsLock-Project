import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, Newsurl } = this.props;

    let defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ62mZn-g_FDVhNAYwqwPoESQG3SPPdwb3tqGphpeBmbQ&s=10";

    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>

          <img
            src={imageurl || defaultImage}
            alt={title}
            className="card-img-top"
            onError={(e) => {
              e.currentTarget.src = defaultImage;
            }}
          />

          <div className="card-body">
            <h5 className="card-title">{title} ...</h5>

            <p className="card-text">
              {description} ...
            </p>

            <a
              href={Newsurl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Read More
            </a>
          </div>

        </div>
      </div>
    );
  }
}

export default NewsItem;