// In src/Page.js

import React from 'react';
import ReactDOM from 'react-dom';
import SidebarNav from './Sidebar';
import NotFound from '../NotFound';
import PrismicReact from 'prismic-reactjs';
import { Image, Card, Grid, Divider, Segment } from 'semantic-ui-react';
import ScrollToTop from 'react-scroll-up';
import { flatten, times } from 'lodash';
import { Link } from 'react-router-dom'
import moment from 'moment';
import BookCard from './BookCard'
//import 'semantic-ui-css/semantic.min.css';

// Declare your component
export default class Books extends React.Component {

  state = {
    homepage: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchSinglePage(this.props);
    this.flipSidebar = this.flipSidebar.bind(this);
    this.renderLogo = this.renderLogo.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
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
  
  renderLogo = () => {
      return(<div class="three wide column" style={{float: 'left'}}>
                <div id='logoTextBoxNoSidebar' onClick={() => this.flipSidebar()}>
                     <h3 id='logoText'> LN </h3>
                 </div> 
        </div>)
  }
  
  renderMainPageTitle = () => {
      let logo = this.renderLogo(); 
      if (!this.props.showSidebar){
          return (
            <div class="ui full grid" verticalAlign='bottom'>
                { logo }
                <div class="thirteen wide column" id='sectionTitleDivNoSideBar'>
                 <h3 id='mainPageSectionIndicator'> My Books </h3>
                </div>
             </div>
          ) } else {
              return ( <h3 id='mainPageSectionIndicator'> My Books </h3> )
      }
  }

  render() {
    // We will fill in this section in Step 3...
      
//      <div class="ui cube shape" id="imageDiv"><Image src={require('../img/adult-beautiful-casual-372042.jpg')} size='medium' id='profileImage'/></div>
      
     const { contextRef } = this.state
     let mainPageTitle = this.renderMainPageTitle()
      
     if (this.state.homepage) {
         
         let content = flatten(times(45, (index) => 
             (  
               <BookCard></BookCard>
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
            
            <div color='orange' id='detailedSegment'>
             
              {content.map(c => c)}
                
            </div>
          </div>
        );
      } else if (this.state.notFound) {
        return <NotFound />;
      }
      return <h1>Loading ... </h1>;
    }
  }
