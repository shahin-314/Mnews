import React, { Component } from 'react'

export class Newsitem extends Component {

  render() {
   let  {title,description,imgUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className='my-3'>
       <div className="card">
       <span className="badge badge-light position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%' ,zIndex:'1'}} > {source}</span>
  <img src={!imgUrl?"https://news.cgtn.com/news/2024-07-17/Melting-ice-caps-slowing-Earth-s-spin-making-days-longer-1vj3Ag60tVu/img/32ee8b0110c34f569aa3893c3a210d1b/32ee8b0110c34f569aa3893c3a210d1b-1920.png":imgUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}<span class="badge badge-success bg-success">news!!</span></h5>
    <p className="card-text">{description}</p>
<p className="card-text"> <small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString}</small></p>
    <a href={newsUrl} target='_blank' className="btn btn-sm btn btn-danger">Read Now</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem;
