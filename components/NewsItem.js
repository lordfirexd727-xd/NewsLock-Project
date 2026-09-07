import { title } from 'process'
import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
  let {title , description} = this.props
    return (
            <div>
           <div className="card" style={{ width: "18rem" }}>
        <img src="https://img.newspim.com/news/2026/09/07/2609071110410790_934_tc.jpg" className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
