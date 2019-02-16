import React from 'react';
import NotFound from '../NotFound';
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-component';
import { RichText } from 'prismic-reactjs';

import { fetchQuery } from '../Services/prismic'

export default class Poems extends React.Component {

  constructor() {
    super()
    this.state = {
        homepage: null,
        notFound: false,
      }
    }

  componentWillMount() {
    this.fetchPoems();
    this.state = { width: 0, height: 0 };
  }
  
  componentWillReceiveProps(props) {
    this.fetchPoems();
  }

  fetchPoems(){
    fetchQuery([
      ['document.type', 'linas-posts'],
      ['my.linas-posts.post-type', 'poem']
    ]).then(res => this.setState({ poems: res.results }))
  }
  
  renderMainPageTitle = () => <h3 id='mainPageSectionIndicator'> My Poems </h3> 

  renderPoems = (poems) => {
    let content = [];
    poems.forEach(poem => {
      const { data, uid} = poem
      const title = RichText.asText(data['post-title'])
      const image = data['post-cover'].url
      content.push(  
        <Link to={`/page/${uid}`}><div id='poemMotherDiv' style={{maxWidth: '300px', maxHeight: '750px', float: 'none', margin: 'auto' }}>
            <img src={image} style={{maxWidth: '100%', maxHeight: '100%'}}/>
            <div id='poemTextContainer'>
              <div id='poemLabel'> { title } </div>
          </div>
        </div></Link>
      ) 
    })
    return content 
  }

  render() {
      
     let mainPageTitle = this.renderMainPageTitle()
     let detailedCss = 'detailedSegment'
     
     if (this.state.poems) {
         
        // window.dispatchEvent(new Event('resize'));
        console.log(this.state.poems)
        const content = this.renderPoems(this.state.poems)
        console.log(content)
         
        return (
          <div id='mainPage' ref='topNode'>
                <div id="mainPageSectionIndicatorDiv">
                    {mainPageTitle}  
                </div>
            
            <br></br>
            
            <div color='orange' id={detailedCss} style={{ marginLeft: '7%' }}>
              <Masonry id='masonry'>
              { content }
               </Masonry>
                
            </div>
          </div>
        );
      } else if (this.state.notFound) {
        return <NotFound />;
      }
      return ( <div id='mainPage' ref='topNode'> </div> );
    }
  }
