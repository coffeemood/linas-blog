// In src/Page.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Image, Card, Grid, Divider, Segment } from 'semantic-ui-react';
import '../css/animation.css'

// Declare your component
export default class TripCard extends React.Component {

  state = {
    homepage: null,
    notFound: false,
  }
  
  render() {
      
      
      
      let title = this.props.title ? this.props.title : ' oops '
      
      let bg = "../img/location1.jpg"
      let bg2 = "../img/location2.jpg"
      let bg3 = "../img/location3.jpg"
      let bg4 = "../img/location4.jpg"
        return (    
        
         
        
          <div id='locationMotherDiv'>
                <div id='locationImageWrapper'>
                    <img id='locationImage' src={require('../img/location2.jpg')}></img>
                </div>
                <div id='locationTextContainer'>
                    <div id='locationLabel'> United Kingdom </div>
                </div>
          </div>
         
           
            
          
            
        )
  }
}