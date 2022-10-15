import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description,imgsource, newsURL, author, date, source} = this.props
    return (
        <div className="card">
        <img src={imgsource?imgsource:"https://cdn.theathletic.com/app/uploads/2022/10/12091755/GettyImages-1240077873-1.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{`${title}...`}<span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left:'85%'}}>
         {`${source}`}
          </span></h5>
          <p className="card-text">{`${description}...`}</p>
          <p className="card-text"><small className="text-muted">By {author?author:"Anonymous"} on {new Date(date).toGMTString()}</small></p>
          <a target={{_blank:true}} href={newsURL} type = "button" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    )
  }
}
