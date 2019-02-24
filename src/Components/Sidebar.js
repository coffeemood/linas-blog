// In src/Page.js

import React from 'react';
import NotFound from '../NotFound';

import { BulletList } from 'react-content-loader';
import { Icon, Image, List } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import { fetchSingle, fetchQuery } from '../Services/prismic';

import 'semantic-ui-css/semantic.min.css';


class SidebarNav extends React.Component {

  state = {
    sidebar: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchSidebar();
    this.fetchFeatured();
  }

  componentWillReceiveProps(props) {
    this.fetchSidebar();
    this.fetchFeatured();
  }

  fetchSidebar(){
    fetchSingle('linas-sidebar').then(sidebar => { this.setState({sidebar} )})
  }

  fetchFeatured(){
    fetchQuery([
      ["document.tags",["featured"]]
    ]).then(result => { this.setState({ featured: result["results"]}) })
  }

  rendermediaBar = () => { return (
      
    <ul class="soc" style={{marginTop: '20px'}}>
        <li><a class="soc-facebook" target="_blank" href="https://www.facebook.com/do.hoang.linh.nga"></a></li>
        <li><a class="soc-linkedin" target="_blank" href="https://www.linkedin.com/in/do-hoang-linh-nga-a8b745101/"></a></li>
        <li><a class="soc-instagram soc-icon-last" target="_blank" href="https://www.instagram.com/linh.nga1703/"></a></li>
    </ul>
            
  )}

  
  renderFeatured = () => { 
    const { featured } = this.state
  
    const featuredItem = featured.map(item => { 
      return (
      <Link to={`/${item['data']['post-type']}/${item.uid}`} style={{margin: '20px', color: 'black', overflow: 'auto'}} id='featuredItem' className='hvr-grow' >
        <List.Item> 
          <List.Content>
            <List.Header> { item.data['post-title'][0] ? item.data['post-title'][0].text : '' } </List.Header>
            { item.data['post-subtitle'][0] ? item.data['post-subtitle'][0].text : '' }
          </List.Content>
        </List.Item>
      </Link>
        ) 
    }); 

    return (
     <List divided selection verticalAlign='middle' id='featuredList'>
       { featuredItem }
    </List>
  )}
  
  render() {
      
    let sidebar = this.state.sidebar 
    let socialMedia = this.rendermediaBar()
    let featuredList = this.state.featured ? this.renderFeatured() : ' '
    
     if (this.state.sidebar) {
        return (
        <div class="four wide column" id='menubarGrid'>
          <div class="ui huge left vertical menu" id='menubar'>
            <div id='menubarTitle'>
             <div id='logoTextBoxSidebar' onClick={() => this.props.flipFooter(true)}>
             <h3 id='logoText' style={{verticalAlign: 'middle', display: 'table-cell'}}> LN </h3>
             </div>
            </div>
             <div id="menubarImgGrid"> 
                 <Image src={require('../img/profile.jpg')} size='medium' circular id='sidebarImg'/>
             </div>

             <h3 id='profileSegment'> Menu </h3>
             <hr id='sidebarHori'></hr>
             <div class="menubarItemGrid">
                  <Link to='/life' ><a class="item"><Icon name='pencil'/>{sidebar.data.category2[0].text}</a></Link>
                  <Link to='/book' ><a class="item"><Icon name='book'/>{sidebar.data.category3[0].text}</a></Link>
                  <Link to='/trip' ><a class="item"><Icon name='paw'/>{sidebar.data.category4[0].text}</a></Link>
                  <Link to='/poem' ><a class="item"><Icon name='snowflake'/>{sidebar.data.category5[0].text}</a></Link>
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
      return <BulletList animate="true" width="600" height="600" />;
      }
      
    }
}

export default SidebarNav

