import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description,imgsource, newsURL} = this.props
    return (
        <div className="card" style={{width: "18rem"}}>
        <img src={imgsource?imgsource:"https://cdn.theathletic.com/app/uploads/2022/10/12091755/GettyImages-1240077873-1.jpg"} className="card-img-top" alt="..." style={{height:"200px",width:"286px"}}/>
        <div className="card-body">
          <h5 className="card-title">{`${title}...`}</h5>
          <p className="card-text">{`${description}...`}</p>
          <a target={{_blank:true}} href={newsURL} type = "button" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    )
  }
}
