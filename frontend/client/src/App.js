import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes'
import Layout from 'components/Layout'

import 'styles/default.sass'
import 'styles/modificators.sass'

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            {routes.map(route =>
              <Route {...route} />
            )}
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
