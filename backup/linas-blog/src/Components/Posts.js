// In src/Page.js

import React from 'react';
import ReactDOM from 'react-dom';
import SidebarNav from './Sidebar';
import NotFound from '../NotFound';
import { PrismicReact, RichText } from 'prismic-reactjs';
import { Image, Card, Grid, Divider, Segment, Icon } from 'semantic-ui-react';
import ScrollToTop from 'react-scroll-up';
import { flatten, times } from 'lodash';
import { Link } from 'react-router-dom'
import moment from 'moment';
import Masonry from 'react-masonry-component'
import Lorem from 'react-lorem-component'
//import 'semantic-ui-css/semantic.min.css';

// Declare your component
export default class Posts extends React.Component {

  state = {
    life: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchPosts(this.props);
    this.flipSidebar = this.flipSidebar.bind(this);
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
      return props.prismicCtx.api.query(
                props.prismicCtx.Predicates.at('document.type', 'linas-posts'),
            ).then((doc) => {
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

  flipSidebar = () => {
      let show = this.props.showSidebar 
      show = !show
      this.props.flipSidebar(show)
  }
  
  flipFooter = () => {
      let show = this.props.showFooter
      show = !show
      this.props.flipFooter(show)
  }
  
  renderMainPageTitle = () => {
      
      if (!this.props.showSidebar){
          return (
            <div class="ui full grid" verticalAlign='bottom'>
               <div class="three wide column" style={{float: 'left'}}>
                <div id='logoTextBoxNoSidebar' onClick={() => this.flipSidebar()}>
                     <h3 id='logoText'> LN </h3>
                 </div> 
               </div> 
                <div class="thirteen wide column" id='sectionTitleDivNoSideBar'>
                 <h3 id='mainPageSectionIndicator'> My Colourful Life </h3>
                </div>
             </div>
          ) } else {
              return ( <h3 id='mainPageSectionIndicator'> My Colourful Life </h3> )
      }
  }
  
  renderPosts = (posts) => {
      
      let content = []
      let count = 0
      for (var post of posts){
          let data = post.data
          let title = RichText.asText(data['post-title'])
          let subtitle = RichText.asText(data['post-subtitle'])
          let uid = post.uid
          let image = data['post-cover'].url
          content.push(<Link to={`/page/${uid}`}><Card
                        header={title}
                        image={image}
                        description={subtitle}
                        id='blogCard'
                    /></Link>)
          count += 1 
          if (count == posts.length) return content
      }
  }

  render() {
    // We will fill in this section in Step 3...
      
//      <div class="ui cube shape" id="imageDiv"><Image src={require('../img/adult-beautiful-casual-372042.jpg')} size='medium' id='profileImage'/></div>
      
     const { contextRef } = this.state
     let mainPageTitle = this.renderMainPageTitle()
     let detailedCss = this.props.showSidebar ? 'detailedSegment' : 'detailedSegment-fullscreen' 
     
     if (this.state.life) {
         
         let content3 = this.renderPosts(this.state.life)
         
         let content = flatten(times(45, (index) => 
             (  
              <Grid stackable columns={3} style={{marginTop: '40px'}}>
              <Grid.Row>
                  <Grid.Column>
                      <Card
                        href='#card-example-link-card'
                        header='A Sample Blog Post'
                        meta='Friend'
                        image={require('../img/img1621.jpg')}
                        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat'
                        id='blogCard'
                      />
                      </Grid.Column>

                  <Grid.Column>
                      <Card
                        href='#card-example-link-card'
                        header='A Sample Blog Post'
                        meta='Friend'
                        image={require('../img/img1613.jpg')}
                        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat'
                        id='blogCard'
                      />
                      </Grid.Column>
                  <Grid.Column>
                      <Link to='/page/1'><Card
                        href='#card-example-link-card'
                        header='A Sample Blog Post'
                        meta='Friend'
                        image={require('../img/img1615.jpg')}
                        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat'
                        id='blogCard'
                        /></Link>
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column>
                      <Card
                        href='#card-example-link-card'
                        header='A Sample Blog Post'
                        meta='Friend'
                        image={require('../img/img1614.jpg')}
                        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat'
                        id='blogCard'
                      />
                      </Grid.Column>

                  <Grid.Column>
                      <Card
                        href='#card-example-link-card'
                        header='A Sample Blog Post'
                        meta='Friend'
                        image={require('../img/img1618.jpg')}
                        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat'
                        id='blogCard'
                      />
                      </Grid.Column>
                  <Grid.Column>
                      <Link to='/page/1'><Card
                        href='#card-example-link-card'
                        header='A Sample Blog Post'
                        meta='Friend'
                        image={require('../img/img1622.jpg')}
                        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat'
                        id='blogCard'
                                             /></Link>
                  </Grid.Column>
              </Grid.Row>
             </Grid>
              )
         ))
         
          let images = ['/images/adult-attractive-beautiful-415829.jpg',
  '/images/adult-beautiful-casual-372042.jpg',
  '/images/adult-blur-fashion-445109.jpg',
  '/images/book1.jpg',
  '/images/book2.jpg',
  '/images/book3.jpg',
  '/images/book4.jpg',
  '/images/book6.jpg',
  '/images/boy-brother-child-35188.jpg',
  '/images/child-girl-little-36483.jpg',
  '/images/cream_pixels.png',
  '/images/egg_shell.png',
  '/images/img1612.jpg',
  '/images/img1613.jpg',
  '/images/img1614.jpg',
  '/images/img1615.jpg',
  '/images/img1616.jpg',
  '/images/img1617.jpg',
  '/images/img1618.jpg',
  '/images/img1619.jpg',
  '/images/img1620.jpg',
  '/images/img1621.jpg',
  '/images/img1622.jpg',
  '/images/img1623.jpg',
  '/images/img1624.jpg',
  '/images/linedpaper.png',
  '/images/location1.jpg',
  '/images/location2.jpg',
  '/images/location3.jpg',
  '/images/location4.jpg',
  '/images/pexels-photo-428338.jpg',
  '/images/pexels-photo-933964.jpg' ]
         
         
         let content2 = images.map(image => 
                                   {
             
             let lorem = <Lorem count='1' sentenceUpperBound='1' format='plain text'/>
                
             return (   <Link to='/page/1'><Card
                        href='#card-example-link-card'
                        header='A Sample Blog Post'
                        meta='Friend'
                        image={image}
                        description={lorem}
                        id='blogCard'
                    /></Link>
              )
             
         })
            
         
         
//         console.log(content)
         
//         <div id="mainProfile">
//                <Image src={require('../img/adult-beautiful-casual-372042.jpg')} size='large' id='imageDiv'/>
//            </div>
//            
//            <h3>{this.state.homepage.data['homepage-subtitle'][0].text}</h3>
//            
            
         
        return (
          <div id='mainPage' ref='topNode'>
                <div id="mainPageSectionIndicatorDiv">
                    {mainPageTitle}  
                </div>
            
            <br></br>
            
            <div color='orange' id={detailedCss}>
             <Masonry id='masonry'>
              {content3.map(c => c)}
               </Masonry>
                
            </div>
          </div>
        );
      } else if (this.state.notFound) {
        return <NotFound />;
      }
      return <Icon name='spinner' loading color='black' size='huge' style={{position: 'absolute', top:'50%', left: '50%', marginLeft: '-2.5%', marginTop: '-2.5%'}}/>;
    }
  }
