import React, { Component } from "react";
import NewsItem from "../components/NewsItem";
export class News extends Component {

 articles = [
  {
    source: {
      id: null,
      name: "Reuters"
    },
    author: "Reuters",
    title: "India needs forum for tech firms to engage foreign regulators",
    description:
      "India's finance minister says Indian technology companies need a coordinated forum to engage with foreign governments and regulators.",
    url: "https://www.reuters.com/world/india/india-needs-forum-tech-firms-engage-foreign-regulators-finance-minister-says-2026-09-11/",
    urlToImage:"https://images.unsplash.com/photo-1518770660439-4636190af475",
    publishedAt: "2026-09-11T11:13:49Z",
    content: "India is looking to help technology companies navigate changing global regulations."
  },

  {
    source: {
      id: null,
      name: "Reuters"
    },
    author: "Reuters",
    title: "Modi, Putin agree to strengthen India-Russia partnership",
    description:
      "Indian Prime Minister Narendra Modi and Russian President Vladimir Putin discussed energy, defence and global conflicts.",
    url: "https://www.reuters.com/business/aerospace-defense/modi-putin-hold-talks-new-delhi-trade-defence-2026-09-11/",
    urlToImage: "https://images.unsplash.com/photo-1521292270410-a8c4d716d518",
    publishedAt: "2026-09-11T10:54:28Z",
    content: "The leaders met in New Delhi ahead of the BRICS summit."
  },

  {
    source: {
      id: null,
      name: "Reuters"
    },
    author: "Reuters",
    title: "Wipro's AI push frees capacity equivalent to 20,000 workers",
    description:
      "Wipro says its AI initiatives have increased productivity and freed capacity that has been redeployed across other roles.",
    url: "https://www.reuters.com/world/india/wipros-ai-push-frees-capacity-equivalent-20000-workers-cto-says-2026-09-10/",
    urlToImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
    publishedAt: "2026-09-10T00:00:00Z",
    content: "Wipro is expanding its AI capabilities as India's software industry adapts to AI."
  }
];

  constructor() {
    super();

    this.state = {
      articles: this.articles,
      loading: false
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5e24d783d69b4823b913b256d5c65e30";
    let data =  await fetch(url)
    let passeddata = await data.json()
    console.log(passeddata);
    this.setState({articles: passeddata.articles})

  }

  render() {
    return (
      <div className="container my-2">
        <h2>NewsLock - Top Headlines</h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title.slice(0 , 45)}
                  description={element.description.slice(0 , 88)}
                  imageurl={element.urlToImage}
                  Newsurl={element.url}
                /> 
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;