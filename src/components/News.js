import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  handleNext = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePrev = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  constructor(props) {
    super(props);
    console.log("Hello, I am a constructor from news");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults :0
    };

    document.title = `${this.capitalizeFirst(this.props.category)} - NewsScape`;
  }

  capitalizeFirst = (String) => {
    return String.charAt(0).toUpperCase() + String.slice(1);
  };

  async updateNews(page) {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey} &page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  
  fetchMoreData = async (page) => {
    
    this.setState({page : this.state.page+1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey} &page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat( parsedData.articles),
      totalResults: parsedData.totalResults
    });
   }

  async componentDidMount() {
    this.updateNews();
  }

  render() {
    return (
      <>
        <h3 className="text-center" style={{ margin: "40px 0px" }}>
          {`NEWSscape - Top Headlines on ${this.capitalizeFirst(
            this.props.category
          )}`}
        </h3>
        {(this.state.loading) && <Spinner /> }
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={ <Spinner />}
        >
            <div className="container">
          <div className="row my-3">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 35) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 100)
                        : ""
                    }
                    urlImage={
                      !element.urlToImage ? "img.jpg" : element.urlToImage
                    }
                    source={element.source.name}
                    urlNews={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={new Date(element.publishedAt).toGMTString()}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrev}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNext}
          >
            Next &rarr;
          </button>
        </div> */}


      </>
    );
  }
}
