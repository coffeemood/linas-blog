import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import './icons.css';
import './Fonts.css';
import Help from './Help';
import Page from './Components/Page2'
import Posts from './Components/Posts'
import Books from './Components/Books'
import Footer from './Components/Footer'
import TripList from './Components/TripList'
import Poems from './Components/Poems'
import SidebarNav from './Components/Sidebar'
import NotFound from './NotFound';

const App = (props) => { 

    const sidebar = <Route render={routeProps => <SidebarNav {...routeProps} prismicCtx={props.prismicCtx}  showFooter={props.showFooter} flipFooter={(show) => props.fetchShowFooter(show)}/> } /> 
  
    const footer = props.showFooter ? <Route render={routeProps => <Footer {...routeProps} prismicCtx={props.prismicCtx} showFooter={props.showFooter} flipFooter={(show) => props.fetchShowFooter(show)} /> } /> : ''
    
    let mainpageCol = 'twelve wide column' 
  
    
return (
   
      <Router>
      <div className="ui full grid" id="motherGrid">
        {sidebar}
        {footer}
        <div className={mainpageCol} id='mainContentGrid'>
            <Switch>
              <Redirect exact from="/" to="/posts"/>
              <Route exact path="/help" component={Help} />
              <Route exact path="/posts" render={routeProps => <Posts {...routeProps} prismicCtx={props.prismicCtx} />} />
              {/* <Route exact path="/page/:uid" render={routeProps => <Posts {...routeProps} prismicCtx={props.prismicCtx} />} /> */}
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
              <Route exact path="/page/:uid" render={routeProps => <Page {...routeProps} prismicCtx={props.prismicCtx} />} />
            </Switch>
        </div>
      </div>
      </Router>
   
)};

export default App;
