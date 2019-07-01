import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'connected-react-router'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { history } from './store'
import AnalyzePage from './containers/analysis'
import BiasPage from './containers/bias'
import StancePage from './containers/stance'
import SummarizerPage from './containers/summarizer'
import LayoutPage from './containers/layout'
import reducers from './reducers'



import 'sanitize.css/sanitize.css'
import './index.css'

const target = document.querySelector('#root')
export const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
export const store = createStoreWithMiddleware(reducers);

render(
  <Provider store={store}>
    <Router history={history}>
      <LayoutPage>
        <Switch>
            {/*Change the defult component to Analyze later*/}
            <Route exact path="/" component={AnalyzePage} />
            <Route exact path="/analyze" component={AnalyzePage} />
            <Route exact path="/stance" component={StancePage} />
            <Route exact path="/bias" component={BiasPage} />
            <Route exact path="/summarization" component={SummarizerPage} />
        </Switch>
      </LayoutPage>
    </Router>
  </Provider>,
  target
)
