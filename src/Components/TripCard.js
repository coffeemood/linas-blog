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
        
         
        
          <div id='locationMotherDiv' style={{position: 'relative', maxWidth: '80%', margin: "0 auto", marginBottom: '25px', color: 'white', height: '550px', paddingLeft: '5px', paddingRight: '5px'}}>
              
                <img src={require('../img/location3.jpg')} style={{maxWidth: '100%', maxHeight:'100%'}}></img>
                <div id='locationTextContainer' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', height: '33%', width: '50%', backgroundColor: '#161616', paddingLeft: '5px', paddingRight: '5px', opacity: '.85'}}>
                    <div id='locationLabel' style={{position: 'absolute', top: '50%', left: '50%', fontSize: '35px', letterSpacing: '2.29px', transform: 'translate(-50%, -50%)', fontFamily: '"Crimson Text", serif', maxWidth: '100%', maxHeight: '100%'}}> United Kingdom </div>
                </div>

          </div>
         
           
            
          
            
        )
  }
}