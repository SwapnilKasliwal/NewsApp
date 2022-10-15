import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'


export default class News extends Component {

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.string
    }
    
    static defaultProps = {
        country: "in",
        pageSize: "20"
    }
     constructor(){
    super()
    this.state = {
        articles : [],
        loading : false,
        page : 1
    }
   }

   async componentDidMount(){
    this.setState({loading: true})
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=77aab9820db94af781584929c663b1c8&page=1&pageSize=${this.props.pageSize}`)
    let newsArticles = await data.json()
    // This is the way we used always set the state of the state variables here in react.though we could have directly written
    // simply like other languages too
    this.setState({articles: newsArticles.articles, totalArticles : newsArticles.totalResults, loading: false})
   }

   handleNextPage = async ()=>{
    this.setState({loading: true})
    if(!(this.state.page +1 > Math.ceil(this.state.totalArticles/20))){
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=77aab9820db94af781584929c663b1c8&page=${this.state.page+1}&pageSize=${this.props.pageSize}`)
        let newsArticles = await data.json()
        // This is the way we used always set the state of the state variables here in react.though we could have directly written
        // simply like other languages too
        this.setState({articles: newsArticles.articles, page : this.state.page +1, loading: false})
    }
   }
   handlePreviousPage = async()=>{
    this.setState({loading: true})
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=77aab9820db94af781584929c663b1c8&page=${this.state.page-1}&pageSize=${this.props.pageSize}`)
        let newsArticles = await data.json()
        // This is the way we used always set the state of the state variables here in react.though we could have directly written
        // simply like other languages too
        this.setState({articles: newsArticles.articles, page: this.state.page -1, loading: false})

   }
    
  render() {
    return (
        <div className='container center'>
            <h1 className='text-center' style={{margin: '40px'}}>NewsApp - Top Headlines for the day</h1>
            <div className="row my-3">
                {this.state.loading && <Spinner/>}
                {this.state.articles.map((element)=>{
                   return <div key={element.url} className="col-md-3 my-2 mx-3">
                    <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imgsource={element.urlToImage?element.urlToImage:"https://cdn.theathletic.com/app/uploads/2022/10/12091755/GettyImages-1240077873-1.jpg"} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                })}   
                
            </div>
            <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousPage}> &larr; Previous</button>
            <button disabled={this.state.page +1 > Math.ceil(this.state.totalArticles/20)} type="button" className="btn btn-dark" onClick={this.handleNextPage}>Next &rarr;</button>
            </div>
        </div>
    )
  }
}
