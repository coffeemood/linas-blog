// In src/Page.js

import React from 'react';
import NotFound from '../NotFound';
import { RichText } from 'prismic-reactjs';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import { fetchQuery } from '../Services/prismic';

export default class Books extends React.Component {

  state = {
    homepage: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchBooks();
  }

  componentWillReceiveProps(props) {
    this.fetchBooks();
  }

  fetchBooks(){
    fetchQuery([
      ['document.type', 'linas-posts'],
      ['my.linas-posts.post-type', 'book']
    ]).then(res => this.setState({ books: res.results }))
  }

  randomColor = () => ['red','brown','purple','yellow','orange'][(Math.floor(Math.random() * 4))]

  
  renderLogo = () => {
      return(<div class="three wide column" style={{float: 'left'}}>
                <div id='logoTextBoxNoSidebar' onClick={() => this.flipSidebar()}>
                     <h3 id='logoText'> LN </h3>
                 </div> 
        </div>)
  }
  
  renderMainPageTitle = () => <h3 id='mainPageSectionIndicator'> My Books </h3> 

  render() {
   
     let mainPageTitle = this.renderMainPageTitle()
     
      
     if (this.state.books) {
         
         let content = this.state.books.map(book => {
           const { data } = book 
           let title = RichText.asText(data['post-title'])
           let subtitle = RichText.asText(data['post-subtitle'])
           let uid = book.uid
           let image = data['post-cover'].url
           return ( <Link to={`/book/${uid}`} style={{margin: '20px'}}><Card
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
      return <div id='mainPage' ref='topNode'></div>;
    }
  }
