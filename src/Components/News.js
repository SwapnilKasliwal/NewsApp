import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    
     constructor(){
    super()
    this.state = {
        articles : [],
        loading : false,
        page : 1
    }
   }

   async componentDidMount(){
    let data = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=77aab9820db94af781584929c663b1c8&page=1&pageSize=20")
    let newsArticles = await data.json()
    // This is the way we used always set the state of the state variables here in react.though we could have directly written
    // simply like other languages too
    this.setState({articles: newsArticles.articles, totalArticles : newsArticles.totalResults})
   }

   handleNextPage = async ()=>{
    if(this.state.page +1 > Math.ceil(this.state.totalArticles/20))
    {
        console.log("I am inside if of next")
    }
    else{
        console.log("I am inside else of next")
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=77aab9820db94af781584929c663b1c8&page=${this.state.page+1}&pageSize=20`)
        let newsArticles = await data.json()
        // This is the way we used always set the state of the state variables here in react.though we could have directly written
        // simply like other languages too
        this.setState({articles: newsArticles.articles, page : this.state.page +1})
    }
   }
   handlePreviousPage = async()=>{
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=77aab9820db94af781584929c663b1c8&page=${this.state.page-1}&pageSize=20`)
    let newsArticles = await data.json()
    // This is the way we used always set the state of the state variables here in react.though we could have directly written
    // simply like other languages too
    this.setState({articles: newsArticles.articles, page: this.state.page -1})

   }
    
  render() {
    return (
        <div className='container my-5'>
            <h3>NewsApp - Top Headlines for the day</h3>
            <div className="row my-3">
                {this.state.articles.map((element)=>{
                   return <div key={element.url} className="col-md-3 my-2 mx-3">
                    <NewsItem title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imgsource={element.urlToImage?element.urlToImage:"https://cdn.theathletic.com/app/uploads/2022/10/12091755/GettyImages-1240077873-1.jpg"} newsURL={element.url}/>
                    </div>
                })}   
                
            </div>
            <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousPage}> &larr; Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextPage}>Next &rarr;</button>
            </div>
        </div>
    )
  }
}
