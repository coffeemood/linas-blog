// In src/Page.js

import React from 'react';
import { List, Modal, Grid } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css';


// Declare your component
class Footer extends React.Component {

  state = {
    footer: true,
    notFound: false,
  }

  componentWillMount() {

  }

  componentWillReceiveProps(props) {
    if (props.showFooter){
        this.setState({footer: props.showFooter})
    }
  }

  render() {
    
    console.log({prop: this.props, state: this.state})
    
    return (<Modal id='footerDimmer' basic open={this.state.footer} onClose={() => { this.props.flipFooter(false) }} style={{width: '100vw', height: '100vh', justifyContent: 'center'}}>
           
           <Modal.Content style={{marginTop: '150px'}}>
             <h1> Linas's Blog </h1>
             <h3> Journals - Travels - Poems - Books - Nonchalant Rants ... </h3>
             <p>
                <br></br>
                Welcome to my blog. Here you will find a collection of posts taken from my personal diary, travel journal entries, book recommendations as well as all my poems. 
                <br></br>
                
                Don't hesitate to hit the feedback button to let me know what you think of my content, as well as follow along on my journey on social medias 
                <br></br>
                
                ~~ À la tienne ~~
                <br></br>
                
                Lina
            </p>
            <br></br>
            <Grid columns={3} divided style={{margin: '0 auto', width: '100vw', color: '#CDA435', marginTop: '50px'}}>
               <Grid.Row>
                <Grid.Column style={{display: 'inherit'}}>
                 <List style={{margin: '0 auto'}}>
                    <List.Item icon='users' content='Linh Nga Corp.' />
                    <List.Item icon='marker' content='Hanoi, VN' />
                    <List.Item
                      icon='mail'
                      content={<a href='mailto:linh.nga1703@gmail.com'>linh.nga1703@gmail.com</a>}
                    />
                    <List.Item icon='globe' content={<a href='http://www.laviedelina.me'>laviedelina.me</a>} />
                  </List>
                </Grid.Column>
                 <Grid.Column style={{display: 'inherit', marginLeft: '-10px'}}>
                    <ul class="soc" style={{margin: '0 auto', paddingTop: '10px'}}>
                        <li><a class="soc-facebook"  target="_blank" href="https://www.facebook.com/do.hoang.linh.nga" id='iconFooter'></a></li>
                        <li><a class="soc-linkedin"  target="_blank" href="https://www.linkedin.com/in/do-hoang-linh-nga-a8b745101/" id='iconFooter'></a></li>
                        <li><a class="soc-instagram soc-icon-last"  target="_blank" href="https://www.instagram.com/linh.nga1703/" id='iconFooter'></a></li>
                    </ul>
                </Grid.Column>
                <Grid.Column style={{display: 'inherit'}}>
                    <div id='logoFooter'>
                         <h3 id='logoTextFooter'> LN </h3>
                     </div> 
                </Grid.Column>
                </Grid.Row>
            </Grid>
             
            </Modal.Content>
      </Modal>)
         
    }
}

export default Footer

