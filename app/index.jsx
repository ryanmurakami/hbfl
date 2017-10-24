import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createHashHistory'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Router from './router.jsx'
import reducers from './reducers/index.js'
import './index.less'

const history = createHistory()
const middleware = routerMiddleware(history)
const initialState = window.__PRELOADED_STATE__

delete window.__PRELOADED_STATE__

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk, middleware)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} />
  </Provider>,
  document.getElementById('app')
)
