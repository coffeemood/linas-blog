// In src/Page.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Image, Card, Grid, Divider, Segment } from 'semantic-ui-react';

// Declare your component
export default class BookCard extends React.Component {

  state = {
    homepage: null,
    notFound: false,
  }
  
  render() {
      
      let title = this.props.title ? this.props.title : ' oops '
      let bg = "../img/book1.jpg"
        return (
          <div id='bookCardMotherDiv'>
              <div id='bookCardCover' >
                <img src={require('../img/book2.jpg')}></img>
              </div>
              <div id='bookCardDetail' >
                  <h4> This Soviet Poet Fought Against Stalin With Her Words — & She Can Teach Us About Resistance </h4>
                  <a> Read More </a>
              </div>
          </div>
        )
  }
}