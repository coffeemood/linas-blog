import React from 'react';
import 'whatwg-fetch';
import Prismic from 'prismic-javascript';
import PrismicConfig from './prismic-configuration';
import App from './App';

export default class PrismicApp extends React.Component {

  state = {
    prismicCtx: null,
    showSidebar: false
  }

  componentWillMount() {
    this.fetchShowSidebar = this.fetchShowSidebar.bind(this)
    this.buildContext().then((prismicCtx) => {
      this.setState({ prismicCtx });
    }).catch((e) => {
      console.error(`Cannot contact the API, check your prismic configuration:\n${e}`);
    });
      
    
  }

  refreshToolbar() {
    const maybeCurrentExperiment = this.api.currentExperiment();
    if (maybeCurrentExperiment) {
      window.PrismicToolbar.startExperiment(maybeCurrentExperiment.googleId());
    }
    window.PrismicToolbar.setup(PrismicConfig.apiEndpoint);
  }

  fetchShowSidebar = (show) => {
      let cstate = this.state
      cstate.showSidebar = show
      this.setState(cstate)
  }

  buildContext() {
    const accessToken = PrismicConfig.accessToken;
    return Prismic.api(PrismicConfig.apiEndpoint, { accessToken }).then(api => ({
      api,
      endpoint: PrismicConfig.apiEndpoint,
      accessToken,
      linkResolver: PrismicConfig.linkResolver,
      toolbar: this.refreshToolbar,
    }));
  }

  render() {
    return (
        <App prismicCtx={this.state.prismicCtx} showSidebar={this.state.showSidebar} fetchShowSidebar={(show) => this.fetchShowSidebar(show) }/>
    );
  }
}
