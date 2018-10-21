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
import TripCard from './TripCard'
//import 'semantic-ui-css/semantic.min.css';

// Declare your component
export default class TripList extends React.Component {

  state = {
    homepage: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchSinglePage(this.props);
    this.renderLogo = this.renderLogo.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.renderCountry = this.renderCountry.bind(this);
      
    let cprop = this.props
    console.log(cprop)
      if (this.props.onPage){
          // fetch country info here 
      }
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

  renderLogo = () => {
      return(<div class="three wide column" style={{float: 'left'}}>
                <div id='logoTextBoxNoSidebar' onClick={() => this.flipSidebar()}>
                     <h3 id='logoText'> LN </h3>
                 </div> 
        </div>)
  }
  
  renderMainPageTitle = () => <h3 id='mainPageSectionIndicator'> My Trips </h3> 
    
  
  renderCountry = () => { 
      
    // fetch & render country info
      
    return (<div> 
        <h1> Russia </h1>
        <p> Russia is the coldest place on the planet </p>
        </div>)
  }

  render() {
    // We will fill in this section in Step 3...
      
//      <div class="ui cube shape" id="imageDiv"><Image src={require('../img/adult-beautiful-casual-372042.jpg')} size='medium' id='profileImage'/></div>
      
     const { contextRef } = this.state
     let mainPageTitle = this.renderMainPageTitle()
     let countryInfo = this.props.match.params.city ? this.renderCountry() : ' '
      
     if (this.state.homepage) {
         
         let content = flatten(times(45, (index) => 
             (  
               <TripCard></TripCard>
              )
         ))
            
         
        return (
          <div id='mainPage' ref='topNode'>
                <div id="mainPageSectionIndicatorDiv">
                    {mainPageTitle}  
                </div>
            { countryInfo }
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
