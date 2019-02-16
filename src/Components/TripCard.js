// In src/Page.js

import React from 'react';
import '../css/animation.css'

// Declare your component
export default class TripCard extends React.Component {

  state = {
    homepage: null,
    notFound: false,
  }
  
  render() {
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