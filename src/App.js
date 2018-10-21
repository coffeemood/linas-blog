import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Grid, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import './icons.css';
import './Fonts.css';
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

const App = (props) => { 

    var showFooter = props.showFooter 
    let sidebar = <Route render={routeProps => <SidebarNav {...routeProps} prismicCtx={props.prismicCtx}  showFooter={props.showFooter} flipFooter={(show) => props.fetchShowFooter(show)}/> } /> 
    
    let footer = props.showFooter ? <Route render={routeProps => <Footer {...routeProps} prismicCtx={props.prismicCtx} showFooter={props.showFooter} flipFooter={(show) => props.fetchShowFooter(show)} /> } /> : ''
    
    let mainpageCol = 'twelve wide column' 
    
return (
   
      <Router>
      <div class="ui full grid" id="motherGrid">
        {sidebar}
        {footer}
        <div class={mainpageCol} id='mainContentGrid'>
            <Switch>
              <Redirect exact from="/" to="/posts"/>
              <Route exact path="/help" component={Help} />
              <Route exact path="/posts" render={routeProps => <Posts {...routeProps} prismicCtx={props.prismicCtx} showFooter={props.showFooter} flipFooter={(show) => props.fetchShowFooter(show)} />} />
              <Route exact path="/page/:uid" render={routeProps => <Posts {...routeProps} prismicCtx={props.prismicCtx} showFooter={props.showFooter} flipFooter={(show) => props.fetchShowFooter(show)} />} />
              <Route exact path="/books" render={routeProps => <Books {...routeProps} prismicCtx={props.prismicCtx} />} />
              <Route exact path="/poems" render={routeProps => <Poems {...routeProps} prismicCtx={props.prismicCtx} />} />
              <Route exact path="/trips" render={routeProps => <TripList {...routeProps} prismicCtx={props.prismicCtx} />} />
              <Route exact path="/trips/:country/" render={routeProps => <TripList {...routeProps} prismicCtx={props.prismicCtx}/>} />
              <Route exact path="/trips/:country/:city" render={routeProps => <TripList {...routeProps} prismicCtx={props.prismicCtx} />} />
              <Route component={NotFound} />
            </Switch>
        </div>
        <div id='postModule'>
            <Switch>
              <Route exact path="/page/:uid" render={routeProps => <Page2 {...routeProps} prismicCtx={props.prismicCtx} />} />
            </Switch>
        </div>
      </div>
      </Router>
   
)};

export default App;
