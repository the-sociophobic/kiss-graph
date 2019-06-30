import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes'
import Layout from 'components/Layout'

import store from 'libs/engines/data/store'
import StoreContext from 'libs/engines/data/store/StoreContext'

import 'styles/default.sass'
import 'styles/modificators.sass'

class App extends Component {
  render() {
    return (
      <Router>
        <StoreContext.Provider value={{store: new store()}}>
          <Layout>
            <Switch>
              {routes.map(route =>
                <Route {...route} key={route.path} />
              )}
            </Switch>
          </Layout>
        </StoreContext.Provider>
      </Router>
    );
  }
}

export default App;
