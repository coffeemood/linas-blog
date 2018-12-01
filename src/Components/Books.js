// In src/Page.js

import React from 'react';
import ReactDOM from 'react-dom';
import NotFound from '../NotFound';
import { RichText } from 'prismic-reactjs';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-component'
import BookCard from './BookCard'
//import 'semantic-ui-css/semantic.min.css';

// Declare your component
export default class Books extends React.Component {

  state = {
    homepage: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchBooks(this.props);
    this.renderLogo = this.renderLogo.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentWillReceiveProps(props) {
    this.fetchBooks(props);
  }

  componentDidUpdate() {
//    this.props.prismicCtx.toolbar();
  }

  scrollToTop = (event) => { 
      const mainDiv = ReactDOM.findDOMNode(this.refs.topNode)
      window.scrollTo(0, mainDiv.offsetTop);
  
  }

  randomColor = () => ['red','brown','purple','yellow','orange'][(Math.floor(Math.random() * 4))]

  fetchBooks(props){
    if (props.prismicCtx) {
      // We are using the function to get a document by its uid
      let query = [props.prismicCtx.Predicates.at('document.type', 'linas-posts'),
                  props.prismicCtx.Predicates.at('my.linas-posts.post-type', 'book')
      ]

      return props.prismicCtx.api.query(query).then((doc) => {
        if (doc) {
          // We put the retrieved content in the state as a doc variable
          this.setState({ books: doc.results });
        } else {
          // We changed the state to display error not found if no matched doc
          this.setState({ notFound: !doc });
        }
      });
    }
    return null;
  }

  
  renderLogo = () => {
      return(<div class="three wide column" style={{float: 'left'}}>
                <div id='logoTextBoxNoSidebar' onClick={() => this.flipSidebar()}>
                     <h3 id='logoText'> LN </h3>
                 </div> 
        </div>)
  }
  
  renderMainPageTitle = () => <h3 id='mainPageSectionIndicator'> My Books </h3> 

  render() {
   
     const { contextRef } = this.state
     let mainPageTitle = this.renderMainPageTitle()
     
      
     if (this.state.books) {
         
         let content = this.state.books.map(book => {
           const { data } = book 
           let title = RichText.asText(data['post-title'])
           let subtitle = RichText.asText(data['post-subtitle'])
           let uid = book.uid
           let image = data['post-cover'].url
           return ( <Link to={`/page/${uid}`} style={{margin: '20px'}}><Card
           header={title}
           image={image}
           color={this.randomColor()}
           description={subtitle}
           id='blogCard'
           className='hvr-grow'
       /></Link>)
         })
         
        return (
          <div id='mainPage' ref='topNode'>
                <div id="mainPageSectionIndicatorDiv">
                    {mainPageTitle}  
                </div>
            
            <div color='orange' id='detailedSegment'>
              <Card.Group>
                {content.map(c => c)}
              </Card.Group>
            </div>
          </div>
        );
      } else if (this.state.notFound) {
        return <NotFound />;
      }
      return <h1>Loading ... </h1>;
    }
  }
