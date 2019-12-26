import React from 'react'
import ReactDOM from 'react-dom'
import { createHashHistory } from 'history'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Router from './router.jsx'
import reducers from './reducers'
import './index.less'

const history = createHashHistory()
const initialState = window.__PRELOADED_STATE__

delete window.__PRELOADED_STATE__

const store = createStore(
  combineReducers({
    ...reducers,
    router: connectRouter(history)
  }),
  initialState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>,
  document.getElementById('app')
)
