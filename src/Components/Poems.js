// In src/Page.js

import React from 'react';
import ReactDOM from 'react-dom';
import SidebarNav from './Sidebar';
import NotFound from '../NotFound';
import PrismicReact from 'prismic-reactjs';
import { Image, Card, Grid, Divider, Segment } from 'semantic-ui-react';
import { flatten, times } from 'lodash';
import { Link } from 'react-router-dom'
import moment from 'moment';
import Masonry from 'react-mason';
import BookCard from './BookCard';
import fs from 'fs';
//import 'semantic-ui-css/semantic.min.css';

// Declare your component
export default class Poems extends React.Component {

  constructor() {
    super()
    this.state = {
        homepage: null,
        notFound: false,
      }
    }

  componentWillMount() {
    this.fetchSinglePage(this.props);
    this.flipSidebar = this.flipSidebar.bind(this);
    this.state = { width: 0, height: 0 };
  }
  
  componentWillReceiveProps(props) {
    this.fetchSinglePage(props);
    if (props.showSidebar){
        this.setState({showSidebar: props.showSidebar})
    }
  }

  componentDidUpdate() {
//    this.props.prismicCtx.toolbar();
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

  handleLayoutComplete() {
      console.log('hello')
  }
    
  flipSidebar = () => {
      let show = this.props.showSidebar 
      show = !show
      this.props.flipSidebar(show)
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
                 <h3 id='mainPageSectionIndicator'> My Poems </h3>
                </div>
             </div>
          ) } else {
              return ( <h3 id='mainPageSectionIndicator'> My Poems </h3> )
      }
  }

  render() {
      
      
     const { contextRef } = this.state
     let mainPageTitle = this.renderMainPageTitle()
     let detailedCss = this.props.showSidebar ? 'detailedSegment' : 'detailedSegment-fullscreen' 
     
     if (this.state.homepage) {
         
         window.dispatchEvent(new Event('resize'));
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
         
         let content = images.map((img) => {
             if (this.props.showSidebar){
            return (  
              <div id='poemMotherDiv' style={{maxWidth: '300px', maxHeight: '750px', float: 'none', margin: 'auto', paddingLeft: '60px'}}>
                  <img src={img} style={{maxWidth: '100%', maxHeight: '100%'}}/>
                  <div id='poemTextContainer'>
                    <div id='poemLabel'> The Poet </div>
                </div>
              </div>
              )} else {
                return (  
              <div id='poemMotherDiv' style={{maxWidth: '300px', maxHeight: '750px', float: 'none', margin: 'auto'}}>
                  <img src={img} style={{maxWidth: '100%', maxHeight: '100%'}}/>
                  <div id='poemTextContainer'>
                    <div id='poemLabel'> The Poet </div>
                </div>
              </div>
              )
            }
         })   
         
        return (
          <div id='mainPage' ref='topNode'>
                <div id="mainPageSectionIndicatorDiv">
                    {mainPageTitle}  
                </div>
            
            <br></br>
            
            <div color='orange' id={detailedCss}>
             
              <Masonry>
               
                {content.map(c => c)}
                
            </Masonry>
              
                
            </div>
          </div>
        );
      } else if (this.state.notFound) {
        return <NotFound />;
      }
      return <h1>Loading ... </h1>;
    }
  }
