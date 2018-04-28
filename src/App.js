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
import Posts from './Components/Posts'
import Books from './Components/Books'
import SidebarNav from './Components/Sidebar'
import NotFound from './NotFound';
import './App.css';
import './icons.css';
import './Fonts.css';
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const App = (props) => { 
    
    var showSidebar = props.showSidebar 
    let sidebar = props.showSidebar ? <Route render={routeProps => <SidebarNav {...routeProps} prismicCtx={props.prismicCtx} showSidebar={props.showSidebar} flipSidebar={(show) => flipShowSidebar(show) }/> } /> : ''
    let mainpageCol = props.showSidebar ? 'twelve wide column' : 'sixteen wide column'
    let flipShowSidebar = (show) => {
        props.fetchShowSidebar(show)
    }
    
return (
  <Router>
  <div class="ui full grid" id="motherGrid">
    {sidebar}
    <div class={mainpageCol} id='mainContentGrid'>
        <Switch>
          <Redirect exact from="/" to="/help"/>
          <Route exact path="/page/:uid" render={routeProps => <Page {...routeProps} prismicCtx={props.prismicCtx} showSidebar={props.showSidebar} flipSidebar={(show) => flipShowSidebar(show) } />} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/posts" render={routeProps => <Posts {...routeProps} prismicCtx={props.prismicCtx} showSidebar={props.showSidebar} flipSidebar={(show) => flipShowSidebar(show) }/>} />
          <Route exact path="/books" render={routeProps => <Books {...routeProps} prismicCtx={props.prismicCtx} showSidebar={props.showSidebar} flipSidebar={(show) => flipShowSidebar(show) }/>} />
          <Route component={NotFound} />
        </Switch>
    </div>
  </div>
  </Router>
  
)};

export default App;
