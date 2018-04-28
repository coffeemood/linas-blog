// In src/Page.js

import React from 'react';
import NotFound from '../NotFound';
import PrismicReact from 'prismic-reactjs';
import { Sidebar, Segment, Menu, Icon } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css';

// Declare your component
export default class SidebarNav extends React.Component {

  state = {
    sidebar: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchSinglePage(this.props);
  }

  componentWillReceiveProps(props) {
    console.log(props)
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

  render() {
    let sidebar = this.state.sidebar
    // We will fill in this section in Step 3...
     if (this.state.sidebar) {
        return (
          <div>
          <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='slide along' visible={true} width='thin' icon='labeled' vertical inverted>
            <Menu.Item name='category1'>
              <Icon name='home' />
              {sidebar.data.category1[0].text}
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              {sidebar.data.category2[0].text}
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              {sidebar.data.category3[0].text}
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              {sidebar.data.category4[0].text}
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              {sidebar.data.category5[0].text}
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='camera' />
              {sidebar.data.category6[0].text}
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <p> The standard Lorem Ipsum passage, used since the 1500s
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

1914 translation by H. Rackham
"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat." </p>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
            
          </div>
        );
      } else if (this.state.notFound) {
        return <NotFound />;
      }
      return <h1>Loading ... </h1>;
    }
  }
