import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {

    let {title, description, imageUrl, newsUrl, author, date} = this.props;

    return (
      <>
      
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt=''/>
        <div className="card-body">
          <h5 className="card-title text-truncate">{title}</h5>
          <p className="card-text text-truncate">{description}</p>
          <p className="card-text"><small className='text-danger'>{author && "By " + author + " on"} {new Date(date).toGMTString()}</small></p>
          {/* <p className="card-text"><small className='text-muted'>{source}</small></p> */}
          <a href={newsUrl} className="btn btn-sm btn-danger" target='_blank' rel='noreferrer'>Read More</a>
        </div>
      </div>

      </>
    )
  }
}

export default NewsItem

