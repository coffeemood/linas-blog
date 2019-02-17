// In src/Page.js

import React from 'react';
import NotFound from '../NotFound';
import { RichText } from 'prismic-reactjs';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';

import { fetchQuery } from '../Services/prismic';

export default class Posts extends React.Component {

  state = {
    life: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchPosts();
  }

  componentWillReceiveProps(props) {
    this.fetchPosts();
  }

  fetchPosts(){
    fetchQuery([
      ['document.type', 'linas-posts'],
      ['my.linas-posts.post-type', 'life']
    ]).then(res => this.setState({ life: res.results }))
  }

  flipFooter = () => {
      let show = this.props.showFooter
      show = !show
      this.props.flipFooter(show)
  }
  
  renderMainPageTitle = () => <h3 id='mainPageSectionIndicator'> My Colourful Life </h3> 
  
  renderPosts = (posts) => {
      
      let content = []
      let count = 0
      for (var post of posts){
          let data = post.data
          let title = RichText.asText(data['post-title'])
          let subtitle = RichText.asText(data['post-subtitle'])
          let uid = post.uid
          let image = data['post-cover'].url
          content.push(<Link to={`/life/${uid}`} style={{margin: '20px'}} ><Card
                        header={title}
                        image={image}
                        description={subtitle}
                        id='blogCard'
                        className='hvr-grow'
                    /></Link>)
          count += 1 
          if (count == posts.length) return content
      }
  }

  render() {
    // We will fill in this section in Step 3...
      
//      <div class="ui cube shape" id="imageDiv"><Image src={require('../img/adult-beautiful-casual-372042.jpg')} size='medium' id='profileImage'/></div>
      
     let mainPageTitle = this.renderMainPageTitle()
     let detailedCss = 'detailedSegment' 
     
     if (this.state.life) {
         
        let content = this.renderPosts(this.state.life)
         
        return (
          <div id='mainPage' ref='topNode'>
                <div id="mainPageSectionIndicatorDiv">
                    {mainPageTitle}  
                </div>
            
            <br></br>
            
            <div color='orange' id={detailedCss}>
             <Masonry id='masonry'>
                {content.map(c => c)}
              </Masonry>
            </div>
          </div>
        );
      } else if (this.state.notFound) {
        return <NotFound />;
      }
      return <div id='mainPage' ref='topNode'></div>
    }
  }
