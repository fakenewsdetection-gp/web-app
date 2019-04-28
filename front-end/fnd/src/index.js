import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store, { history } from './store'
import App from './containers/app'
import AnalyzePage from './containers/analyze'
import BiasPage from './containers/bias'
import StancePage from './containers/stance'
import SummarizerPage from './containers/summarizer'



import 'sanitize.css/sanitize.css'
import './index.css'

const target = document.querySelector('#root')
export const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/stance" component={StancePage} />
        <Route exact path="/bias" component={BiasPage} />
        <Route exact path="/summarization" component={SummarizerPage} />
      </Switch>
      {/*<div>
        <App />
      </div>*/}
    </ConnectedRouter>
  </Provider>,
  target
)
