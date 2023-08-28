import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 9,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capFistLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }

    document.title = `${this.capFistLetter(this.props.category)} - News Monkey`
  }

  async updateNews() {

    this.props.setProgress(10);

    const url = `https:newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    // fetch(url)
    // .then((res) => res.json())
    // .then((json) => {
    //   this.setState({
    //     articles: json.articles,
    //     totalResults: json.totalResults,
    //     loading: false,
    //   });
    // })

    fetch(url)
    .then((res) => {
      this.props.setProgress(30);
      return res.json();
    })
    .then((json) => {
      this.props.setProgress(70);
      this.setState({
        articles: json.articles,
        totalResults: json.totalResults,
        loading: false,
      });
      this.props.setProgress(100);
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
      this.props.setProgress(100);
    });

    this.props.setProgress(100);

  }

  componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})

    const url = `https:newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

    fetch(url)
    .then((res) => res.json())
    .then((json) => {
      this.setState({
          articles: this.state.articles.concat(json.articles),
          totalResults: json.totalResults
      });

    })

  }


  render() {

    return (
      <>

          <div className="container mt-5">

            <h1 className='mb-5 text-center'>News Monkey - {this.capFistLetter(this.props.category)} Top Highlights</h1>

            {/* {this.state.loading && <Spinner/>} */}

            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<Spinner/>}
              style={{overflowX: "hidden"}}
            >

              <div className="row mb-5">

                {this.state.articles.map((element, index) => {
                  
                  if (element.urlToImage === null) {
                    return null;
                  }

                  else {

                    const key = `${index}-${element.url}`;

                    return (<div className="col-md-4 p-3" key={key}>
                      <NewsItem title={element.title} description={element.description} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>);
                  }

                })}

              </div>

            </InfiniteScroll>

          </div>

      </>
    )
  }
}

export default News

