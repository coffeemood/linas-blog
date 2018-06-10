// In src/Page.js

import React from 'react';
import ReactDOM from 'react-dom';
import SidebarNav from './Sidebar';
import NotFound from '../NotFound';
import PrismicReact from 'prismic-reactjs';
import { Image, Card, Grid, Divider, Segment, Icon } from 'semantic-ui-react';
import ScrollToTop from 'react-scroll-up';
import { flatten, times } from 'lodash';
import { Link } from 'react-router-dom'
import moment from 'moment';
//import 'semantic-ui-css/semantic.min.css';

// Declare your component
export default class Posts extends React.Component {

  state = {
    homepage: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchSinglePage(this.props);
    this.flipSidebar = this.flipSidebar.bind(this);
    this.flipFooter = this.flipFooter.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  
  componentWillReceiveProps(props) {
    this.fetchSinglePage(props);
  }

  componentDidUpdate() {
//    this.props.prismicCtx.toolbar();
  }

  scrollToTop = (event) => { 
      const mainDiv = ReactDOM.findDOMNode(this.refs.topNode)
      console.log(this.refs)
      window.scrollTo(0, mainDiv.offsetTop);
  
  }

  fetchSinglePage(props) {
    if (props.prismicCtx) {
      // We are using the function to get a document by its uid
      return props.prismicCtx.api.getSingle('linas-home').then((doc) => {
        if (doc) {
          // We put the retrieved content in the state as a doc variable
          this.setState({ homepage: doc });
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

  render() {
    // We will fill in this section in Step 3...
      
//      <div class="ui cube shape" id="imageDiv"><Image src={require('../img/adult-beautiful-casual-372042.jpg')} size='medium' id='profileImage'/></div>
      
     const { contextRef } = this.state
     let mainPageTitle = this.renderMainPageTitle()
     let detailedCss = this.props.showSidebar ? 'detailedSegment' : 'detailedSegment-fullscreen' 
     
     if (this.state.homepage) {
         
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
             
              {content.map(c => c)}
                
            </div>
          </div>
        );
      } else if (this.state.notFound) {
        return <NotFound />;
      }
      return <Icon name='spinner' loading color='black' size='huge' style={{position: 'absolute', top:'50%', left: '50%', marginLeft: '-2.5%', marginTop: '-2.5%'}}/>;
    }
  }
