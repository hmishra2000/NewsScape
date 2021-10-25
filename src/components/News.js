import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types';


const News =(props)=> {
  const[articles, setArticles]= useState([]);
  const[loading, setLoading]= useState(true);
  const[page, setPage]= useState(1);
  const[totalResults, setTotalResults]= useState(0);

  
  const capitalizeFirst = (String) => {
    return String.charAt(0).toUpperCase() + String.slice(1);
  };

  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }

  
  const fetchMoreData = async (page) => {
    
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
   }


  useEffect(() => {
    document.title = `${capitalizeFirst(props.category)} - NewsScape`;
    updateNews();
     //eslint-disable-next-line
  },[])
 
    return (
      <>
        <h3 className="text-center" style={{ margin: "90px 30px" }}>
          {`NEWSscape - Top Headlines on ${capitalizeFirst(
            props.category
          )}`}
        </h3>
        {(loading) && <Spinner /> }
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={ <Spinner />}
        >
            <div className="container">
          <div className="row my-3">
            {articles.map((element) => {
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
            disabled={state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrev}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              state.page + 1 >
              Math.ceil(state.totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div> */}


      </>
    );
}
News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
    }
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    }


export default News;