import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let { title, description, urlImage, urlNews, author, date, source} = this.props;
        return (
            <div className="my-3">
               
                <div className="card">
                <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left : '85%', zIndex: '1'}}>{source}</span> 
                    <img src={urlImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted"> By {author} on {date}</small></p>
                        <a href={urlNews} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}
