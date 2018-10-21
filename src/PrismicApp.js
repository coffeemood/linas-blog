import React from 'react';
import 'whatwg-fetch';
import Prismic from 'prismic-javascript';
import PrismicConfig from './prismic-configuration';
import App from './App';

export default class PrismicApp extends React.Component {

  state = {
    prismicCtx: null,
    showFooter: false
  }

  componentWillMount() {
    this.fetchShowFooter = this.fetchShowFooter.bind(this)
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
  
  fetchShowFooter = (show) => {
      console.log('here')
      let cstate = this.state
      cstate.showFooter = show
      this.setState(cstate)
  }

  buildContext() {
    const accessToken = PrismicConfig.accessToken;
    const Predicates = Prismic.Predicates
    return Prismic.api(PrismicConfig.apiEndpoint, { accessToken }).then(api => ({
      api,
      Predicates,
      endpoint: PrismicConfig.apiEndpoint,
      accessToken,
      linkResolver: PrismicConfig.linkResolver,
      toolbar: this.refreshToolbar,
    }));
  }

  render() {
    return (
        <App prismicCtx={this.state.prismicCtx} showFooter={this.state.showFooter} fetchShowFooter={(show) => this.fetchShowFooter(show)} />
    );
  }
}
