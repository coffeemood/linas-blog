import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Preview from './Preview';
import Help from './Help';
import Page from './Components/Page'
import Page2 from './Components/Page2'
import Posts from './Components/Posts'
import Books from './Components/Books'
import Footer from './Components/Footer'
import TripList from './Components/TripList'
import Poems from './Components/Poems'
import SidebarNav from './Components/Sidebar'
import NotFound from './NotFound';
import './App.css';
import './icons.css';
import './Fonts.css';
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


const App = (props) => { 
    
    var showSidebar = props.showSidebar 
    var showFooter = props.showFooter 
    let sidebar = props.showSidebar ? <Route render={routeProps => <SidebarNav {...routeProps} prismicCtx={props.prismicCtx} showSidebar={props.showSidebar} flipSidebar={(show) => flipShowSidebar(show) } showFooter={props.showFooter} flipFooter={(show) => props.fetchShowFooter(show)}/> } /> : ''
    
    let footer = props.showFooter ? <Route render={routeProps => <Footer {...routeProps} prismicCtx={props.prismicCtx} showFooter={props.showFooter} flipFooter={(show) => props.fetchShowFooter(show)} /> } /> : ''
    
    let mainpageCol = props.showSidebar ? 'twelve wide column' : 'sixteen wide column'
    let flipShowSidebar = (show) => {
        props.fetchShowSidebar(show)
    }
    
    
    /*
    <div class="one wide column">
        <div id='footerbar' style={{
                          backgroundColor: "#000000",
                          paddingTop: '16px',
                          paddingBottom: '16px',
                          color: "#CDA435",
                          borderRadius: "35px 35px 0px 0px",    
                          border: '0px solid #000000',
                          position: 'fixed',
                          bottom: '0',
                          left: '0',
                          width: '45px',
                          zIndex: '10',
                          height: '100vh'
                  }}>
                  
                 <div id="logoTextBoxSidebar"><h3 id='profileSegment' style={{verticalAlign: 'middle', display: 'table-cell'}}> LN </h3></div>
                 
          </div>
        </div>*/
    
return (
   
      <Router>
      <div class="ui full grid" id="motherGrid">
        {sidebar}
        {footer}
        <div class={mainpageCol} id='mainContentGrid'>
            <Switch>
              <Redirect exact from="/" to="/posts"/>
              <Route exact path="/page/:uid" render={routeProps => <Page2 {...routeProps} prismicCtx={props.prismicCtx} showContent={true} />} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/posts" render={routeProps => <Posts {...routeProps} prismicCtx={props.prismicCtx} showSidebar={props.showSidebar} flipSidebar={(show) => flipShowSidebar(show)} showFooter={props.showFooter} flipFooter={(show) => props.fetchShowFooter(show)} />} />
              <Route exact path="/books" render={routeProps => <Books {...routeProps} prismicCtx={props.prismicCtx} showSidebar={props.showSidebar} flipSidebar={(show) => flipShowSidebar(show) }/>} />
              <Route exact path="/poems" render={routeProps => <Poems {...routeProps} prismicCtx={props.prismicCtx} showSidebar={props.showSidebar} flipSidebar={(show) => flipShowSidebar(show) }/>} />
              <Route exact path="/trips" render={routeProps => <TripList {...routeProps} prismicCtx={props.prismicCtx} showSidebar={props.showSidebar} flipSidebar={(show) => flipShowSidebar(show) }/>} />
              <Route exact path="/trips/:country/" render={routeProps => <TripList {...routeProps} prismicCtx={props.prismicCtx} showSidebar={props.showSidebar} flipSidebar={(show) => flipShowSidebar(show) }/>} />
              <Route exact path="/trips/:country/:city" render={routeProps => <TripList {...routeProps} prismicCtx={props.prismicCtx} showSidebar={props.showSidebar} flipSidebar={(show) => flipShowSidebar(show) } />} />
              <Route component={NotFound} />
            </Switch>
        </div>
      </div>
      </Router>
   
)};

export default App;
