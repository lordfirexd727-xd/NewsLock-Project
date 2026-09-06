import React, { Component } from 'react'
import NewsIteme from '../components/NewsItem'

export class News extends Component {
  render() {
    return (
      <div>
        this is a news component
       <NewsIteme />
      </div>
    )
  }
}

export default News
