// In src/Page.js

import React from 'react';
import { BulletList } from 'react-content-loader';
import NotFound from '../NotFound';
import { RichText } from 'prismic-reactjs';
import { Image, Modal } from 'semantic-ui-react';
import moment from 'moment';

export default class Page extends React.Component {

  state = {
    content: null,
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
    if (props.prismicCtx && props.match.params) {
      // We are using the function to get a document by its uid
      return props.prismicCtx.api.getByUID('linas-posts', props.match.params.uid).then(doc => {
        if (doc) {
          console.log(doc.data)
          this.setState({ content: doc.data, doc: doc, type: doc.data['post-type'] });
        } else {
          this.setState({ notFound: !doc });
        }
      });
    }
    return null;
  }

  renderHeaderInfo = () => {
      if (this.state.content){
          let content = this.state.content
          return (
              <div class="ui full grid" verticalAlign='bottom' style={{marginTop: '10px', display: 'block'}}>

               <h1 id='postHeader1'> { RichText.render(content['post-title']) } </h1> 
               
               <h5 id='postHeader5'> 
                   { RichText.render(this.state.content['post-author']) } 
               </h5>
               
               <h5 style={{textAlign: 'center', fontSize: '14px', fontStyle: 'italic',letterSpacing: '1px', color: "#B2B4B5", marginBottom: '15px'}}>
                   { content['post-published'] ? moment.utc(content['post-published']).format('DD/MM/YYYY HH:mm') : '' } 
               </h5>

              </div>)
      }
      
  }
  
  closeContent = () => { 
    this.setState({open: false})
    let place = ''
    console.log(`Type is ${this.state.type} motherfucker`)
    switch(this.state.type){
      case 'book':
        place = 'books';
        break;
      case 'life':
        place = 'posts';
        break;
    }

    this.props.history.push(`/${place}`)
    
  }
  
  render() {
   
     let headerInfo = this.renderHeaderInfo()
     
     if (this.state.content) {
         
        return (
          
        <Modal size='large' dimmer='inverted' open={this.state.open} onClose={this.closeContent}>
          <Modal.Header> 
              {headerInfo} 
          </Modal.Header>
          <Modal.Content id='blogSegment'>
           
            <div id="mainPageImgDiv"> 
                    <Image src={ this.state.content['post-cover'].url } size='massive' id='imageDiv'/>
                    <br></br>
            </div>
            <br></br>{ RichText.render(this.state.content['post-body']) } <br></br><br></br><hr></hr><br></br><br></br>
    
          </Modal.Content>
        </Modal>

          
        );
      } else if (this.state.notFound) {
        return <NotFound />;
      }
      return <BulletList animate="true" width="600" height="600" />;
    }
}

