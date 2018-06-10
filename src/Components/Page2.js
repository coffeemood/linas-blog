// In src/Page.js

import React from 'react';
import SidebarNav from './Sidebar';
import NotFound from '../NotFound';
import PrismicReact from 'prismic-reactjs';
import { Image, Segment, Grid, Icon, Modal } from 'semantic-ui-react';
import { flatten, times } from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import moment from 'moment';

//import 'semantic-ui-css/semantic.min.css';

// Declare your component
export default class Page extends React.Component {

  state = {
    homepage: null,
    notFound: false,
    open: false,
  }

  componentWillMount() {
    this.fetchSinglePage(this.props);
    this.setState({open: true})
  }

  componentWillReceiveProps(props) {
//    console.log(props)
    this.fetchSinglePage(props);

  }

  componentDidUpdate() {
//    this.props.prismicCtx.toolbar();
  }

  fetchSinglePage(props) {
    if (props.prismicCtx) {
      // We are using the function to get a document by its uid
      return props.prismicCtx.api.getSingle('linas-home').then((doc) => {
        if (doc) {
          // We put the retrieved content in the state as a doc variable
          this.setState({ homepage: doc });
        } else {
          // We changed the state to display error not found if no matched doc
          this.setState({ notFound: !doc });
        }
      });
    }
    return null;
  }

  renderHeaderInfo = () => {
      return (
      <div class="ui full grid" verticalAlign='bottom' style={{marginTop: '10px', display: 'block'}}>
     
       <h1 style={{textAlign: 'center', fontSize: '36px'}}> Make your content shine by getting out of the way </h1> 
       <h5 style={{textAlign: 'center', fontSize: '14px', letterSpacing: '1px', marginBottom: '-20px' }}> Author: Lina </h5>
       <h5 style={{textAlign: 'center', fontSize: '12px', fontStyle: 'italic',letterSpacing: '1px', color: "#B2B4B5", marginBottom: '15px'}}>{moment().format('MMMM DD, YYYY @ HH:mm')}</h5>
        
      </div>)
  }
  
  closeContent = () => { 
    this.setState({open: false})
    this.props.history.goBack()
  }
  
  render() {
    // We will fill in this section in Step 3...
      
//      <div class="ui cube shape" id="imageDiv"><Image src={require('../img/adult-beautiful-casual-372042.jpg')} size='medium' id='profileImage'/></div>
      
     console.log({props: this.props, state: this.state})
     let headerInfo = this.renderHeaderInfo()
//     let pageTitle = this.renderMainPageTitle()
     
     
     if (this.state.homepage) {
         
         let content = flatten(times(45, (index) => 
             (<p key={index}>Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia facete scriptorem, est autem aliquip detraxit at. Usu ocurreret referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei ex natum rebum iisque. Id vix fabulas oporteat, 😁😁😁😁😁😁 ei quo vide phaedrum, vim vivendum maiestatis in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dui urna, pretium sed est quis, scelerisque consequat nunc. Vivamus eget arcu maximus, luctus nisi in, condimentum lacus. Integer laoreet, nunc eu varius vehicula, magna turpis pulvinar ligula, sed suscipit mauris augue ullamcorper dui. Duis et varius tortor, eu pretium tellus. Vestibulum efficitur arcu est, at placerat eros volutpat vel. Nullam tempor feugiat ante sed lacinia. Maecenas fringilla eleifend vehicula. Aliquam eget neque porttitor, feugiat massa accumsan, volutpat nisi. Aenean condimentum justo quis enim sollicitudin, in cursus lacus vehicula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin sagittis diam a nisi.</p>)
         ))
         
        return (
          
        <Modal size='fullscreen' open={this.state.open} onClose={this.closeContent}>
          <Modal.Header> {headerInfo} </Modal.Header>
          <Modal.Content id='blogSegment'>
           
            <div id="mainPageImgDiv"> 
                    <Image src={require('../img/adult-blur-fashion-445109.jpg')} size='massive' id='imageDiv'/>
                    <h5 style={{textAlign: 'center'}}>Source: Anonymous</h5>
            </div>
            <br></br>
            {content.map(c => c)}
          </Modal.Content>
        </Modal>

          
        );
      } else if (this.state.notFound) {
        return <NotFound />;
      }
      return <Icon name='spinner' loading color='black' size='huge' style={{position: 'absolute', top:'50%', left: '50%', marginLeft: '-2.5%', marginTop: '-2.5%'}}/>
    }
}

