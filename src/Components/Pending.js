import { Dimmer, Loader } from 'semantic-ui-react';
import React from 'react';

export default class Pending extends React.Component {
  render() {
    return (
        <div id='mainPage' ref='topNode'>
            <div id="mainPageSectionIndicatorDiv">
              <h3 id='mainPageSectionIndicator' style={{ color: 'transparent ' }}> DUMMY </h3> 
            </div>
            <Dimmer active style={{ opacity: .4, marginTop: '70px', marginBottom: '35px', paddingTop: '4.5rem' }}>
              <Loader />
            </Dimmer>
        </div>
    )
  }
}