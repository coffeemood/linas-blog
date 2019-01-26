// In src/Page.js

import React from 'react';
import NotFound from '../NotFound';
import { RichText } from 'prismic-reactjs';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-component'
//import 'semantic-ui-css/semantic.min.css';

// Declare your component
export default class Posts extends React.Component {

  state = {
    life: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchPosts(this.props);
    this.flipFooter = this.flipFooter.bind(this);
  }

  componentWillReceiveProps(props) {
    this.fetchPosts(props);
  }

  componentDidUpdate() {
//    this.props.prismicCtx.toolbar();
  }

  fetchPosts(props) {
    if (props.prismicCtx) {
      // We are using the function to get a document by its uid
      let query = [props.prismicCtx.Predicates.at('document.type', 'linas-posts'),
                  props.prismicCtx.Predicates.at('my.linas-posts.post-type', 'life')
      ]

      return props.prismicCtx.api.query(query).then((doc) => {
        if (doc) {
          // We put the retrieved content in the state as a doc variable
          this.setState({ life: doc.results });
        } else {
          // We changed the state to display error not found if no matched doc
          this.setState({ notFound: !doc });
        }
      });
    }
    return null;
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
          content.push(<Link to={`/page/${uid}`} style={{margin: '20px'}} ><Card
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
