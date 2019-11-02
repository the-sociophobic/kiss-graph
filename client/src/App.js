import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes'

import Helmet from 'components/Helmet'

import store from 'libs/engines/data/store'
import StoreContext from 'libs/engines/data/store/StoreContext'

import store2 from 'libs/engines/data/store2'
import Store2Context from 'libs/engines/data/store2/Store2Context'

import 'styles/default.sass'
import 'styles/modificators.sass'

// import './config'

class App extends Component {
  render() {
    return (
      <Router>
        <StoreContext.Provider value={{store: new store()}}>
        <Store2Context.Provider value={{store2: new store2()}}>
          <Helmet />
          <Switch>
            {routes.map(route =>
              <Route {...route} key={route.path} />
            )}
          </Switch>
        </Store2Context.Provider>
        </StoreContext.Provider>
      </Router>
    );
  }
}

export default App;
