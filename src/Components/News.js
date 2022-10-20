import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.string,
        apiKey: PropTypes.string
    }
    
    static defaultProps = {
        country: "in",
        pageSize: "20"
    }
     constructor(props){
    super(props)
    this.state = {
        articles : [],
        loading : true,
        page : 1,
        totalArticles : 0
    }
   }
   capitalize(element){
    return element.toLowerCase()[0].toUpperCase() + element.slice(1,)
   }

   async componentDidMount(){
    document.title = this.capitalize(this.props.category)+" | NewsApp"
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`)
    let newsArticles = await data.json()
    // This is the way we used always set the state of the state variables here in react.though we could have directly written
    // simply like other languages too
    this.setState({articles: newsArticles.articles, totalArticles : newsArticles.totalResults, loading: false})
   
}

   fetchMoreData = async (pageNo) => {
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}`)
    let newsArticles = await data.json()
    // This is the way we used always set the state of the state variables here in react.though we could have directly written
    // simply like other languages too
    
    this.setState({articles: this.state.articles.concat(newsArticles.articles),totalArticles : newsArticles.totalResults, page: this.state.page +1})
  };

  
    
  render() {
    return (
        <>
            <h1 className='text-center my-5' style={{margin: '40px'}}>NewsApp - Top {this.capitalize(this.props.category)} Headlines</h1>
            {this.state.loading && <Spinner/>}
            <InfiniteScroll
            // Here this dataLength is the length of the items that are currently being displayed and not the no of items that could
            // be displayed instead.
          dataLength={this.state.articles.length}
          next={()=>this.fetchMoreData(this.state.page +1)}
          // So the issue which was coming in this laoder was by-mistakenly i was calling totalResults which does not even exist
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Spinner/>}
        >
          <div className="row my-3 d-flex justify-content-center">
                {this.state.articles.map((element)=>{
                   return <div key={element.url} className="col-md-3 my-2 mx-3">
                    <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imgsource={element.urlToImage?element.urlToImage:"https://cdn.theathletic.com/app/uploads/2022/10/12091755/GettyImages-1240077873-1.jpg"} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                })}   
                
            </div>
        </InfiniteScroll>
        </>
    )
  }
}
