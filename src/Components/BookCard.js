// In src/Page.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Image, Card, Grid, Divider, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

// Declare your component
export default class BookCard extends React.Component {

  state = {
    homepage: null,
    notFound: false,
  }
  
  render() {
      
      let title = this.props.title ? this.props.title : ''
      let subtitle = this.props.subtitle ? this.props.subtitle : ''
      let bg = this.props.image ? this.props.image : ''
      let uid = this.props.uid ? this.props.uid : ''
        return (
            <div>    
                  <Link style={{color: 'black' }}to={`/page/${uid}`}><div id='bookCardMotherDiv'>
                      <div id='bookCardCover' >
                        <img src={bg}></img>
                      </div>
                      <div id='bookCardDetail' >
                          <h4> {title} </h4>
                          <a> {subtitle} </a>
                      </div>
                      </div></Link>
            </div>
        )
  }
}