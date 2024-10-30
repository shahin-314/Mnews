import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps={
    country:'in',
    pageSize:8,
    category: 'general',
  }

  static propTypes={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string,
  }

 constructor(props){
    super(props)
    // console.log("hello i am from news component");
    this.state= {
        articles:[],
        loading:false,
        page:1,
        totalResults:0
    }
    document.title=`${this.props.category}-Your's News`;
  }

  async updateNews(){

    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2bc0549e76ab4c71b200acf1b33866c6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data= await fetch(url);
    let pdata= await data.json()
    // console.log(pdata);
    this.setState({
      articles:pdata.articles,
      totalResults:pdata.totalResults,
      loading:false,
     
    })

  }




  async componentDidMount(){

    this.updateNews();
  }

  preClick=async()=>{
   
    
    this.setState({page: this.state.page-1});
    this.updateNews();
  }

  nextClick=async()=>{


  this.setState({page: this.state.page+1});
  this.updateNews();
  }



  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2bc0549e76ab4c71b200acf1b33866c6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    let data= await fetch(url);
    let pdata= await data.json()
    // console.log(pdata);
    this.setState({
      articles:this.state.articles.concat(pdata.articles),
      totalResults:pdata.totalResults
      // loading:false,
     
    })
  };

  render() {
    // console.log("render")
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:'40px 50px'}}>Your's News - Top {this.props.category} Headlines</h1>
     {/* { this.state.loading && <Spinner/>} */}

     <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.lenght!==this.state.totalResults}
          loader={<Spinner/>}
          
        >

          <div className="container">

        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imgUrl={element.urlToImage} newsUrl={element.url} 
           author={element.author} date={element.publishedAt}
           source={element.source.name}/>
          </div>
          
        })}
        

        </div>
        </div>

        </InfiniteScroll>


      </div>
    )
  }
}

export default News;
