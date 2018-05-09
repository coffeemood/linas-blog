// In src/Page.js

import React from 'react';
import NotFound from '../NotFound';
import PrismicReact from 'prismic-reactjs';
import { Sidebar, Segment, Menu, Icon, Image, List, Button, Divider } from "semantic-ui-react"
import { Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';


// Declare your component
class SidebarNav extends React.Component {

  state = {
    sidebar: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchSinglePage(this.props);
    this.flipSidebar = this.flipSidebar.bind(this);
  }

  componentWillReceiveProps(props) {
    this.fetchSinglePage(props);
  }

  fetchSinglePage(props) {
    if (props.prismicCtx) {
      // We are using the function to get a document by its uid
      return props.prismicCtx.api.getSingle('linas-sidebar').then((doc) => {
        if (doc) {
          // We put the retrieved content in the state as a doc variable
          this.setState({ sidebar: doc });
        } else {
          // We changed the state to display error not found if no matched doc
          this.setState({ notFound: !doc });
        }
      });
    }
    return null;
  }

  flipSidebar = () => {
      let show = this.props.showSidebar 
      show = !show
      this.props.flipSidebar(show)
  }

  rendermediaBar = () => { return (
      
    <ul class="soc" style={{marginTop: '20px'}}>
        <li><a class="soc-twitter" href="#"></a></li>
        <li><a class="soc-facebook" href="#"></a></li>
        <li><a class="soc-linkedin" href="#"></a></li>
        <li><a class="soc-instagram soc-icon-last" href="#"></a></li>
    </ul>
            
      )}
  
  renderFeatured = () => { return (
     <List divided selection verticalAlign='middle' id='featuredList'>
      <List.Item>
        <List.Content>
          <List.Header>My two little angels</List.Header>
          On being a working mom
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>On the memories of France </List.Header>
          A poodle, its pretty basic
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Paulo</List.Header>
          He's also a dog
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>The AUF Journey </List.Header>
          They say you never forget your first
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>All my past romances </List.Header>
          The Goods, The Bads & The Ugly 
        </List.Content>
      </List.Item>
    </List>
  )}
  
  render() {
    let sidebar = this.state.sidebar 
    let socialMedia = this.rendermediaBar()
    let featuredList = this.renderFeatured() 
    
    // We will fill in this section in Step 3...
     if (this.state.sidebar) {
        return (
           
          <div class="four wide column" id='menubarGrid'>
          <div class="ui huge left vertical menu" id='menubar'>
            <div id='menubarTitle'>
             <div id='logoTextBoxSidebar' onClick={() => this.flipSidebar()}>
             <h3 id='profileSegment' style={{verticalAlign: 'middle', display: 'table-cell'}}> LN </h3>
             </div>
            </div>
             <div id="menubarImgGrid"> 
                 <Image src={require('../img/pexels-photo-428338.jpg')} size='medium' circular id='sidebarImg'/>
             </div>

             <h3 id='profileSegment'> Menu </h3>
             <hr id='sidebarHori'></hr>
             <div class="menubarItemGrid">
                  <Link to='/page/1'><a class="item"><Icon name='home'/>{sidebar.data.category1[0].text}</a></Link>
                  <Link to='/posts'><a class="item"><Icon name='pencil'/>{sidebar.data.category2[0].text}</a></Link>
                  <Link to='/books'><a class="item"><Icon name='book'/>{sidebar.data.category3[0].text}</a></Link>
                  <Link to='/trips'><a class="item"><Icon name='paw'/>{sidebar.data.category4[0].text}</a></Link>
                  <Link to='/poems'><a class="item"><Icon name='snowflake'/>{sidebar.data.category5[0].text}</a></Link>
             </div>
             <h3 id='profileSegment'> Social Media </h3>
             <hr id='sidebarHori'></hr>
             {socialMedia}
             <h3 id='profileSegment'> Recommended Reads </h3>
             <hr id='sidebarHori'></hr>
             {featuredList}
             <br></br>
          </div> 
        </div>  
            
                   
        );
      } else if (this.state.notFound) {
        return <NotFound />;
      } else {
        return <h1>Loading ... </h1>;
      }
      
    }
}

export default SidebarNav

