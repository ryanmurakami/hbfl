import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes/index.jsx'

class Router extends React.Component {
  render () {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          { routes.map((route, i) => (
            <Route
              key={i}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </div>
      </ConnectedRouter>)
  }
}

export default Router
