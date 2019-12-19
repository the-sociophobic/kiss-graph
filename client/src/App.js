import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes'

import Helmet from 'components/Helmet'

import { initialState, StoreContext } from 'libs/engines/data/store'

import 'styles/index.sass'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState({
      state: this.state,
      setState: this.setState,
    })
  }
  
  render() {
    return (
      <Router>
        <StoreContext.Provider value={this.state}>
          <Helmet />
          <Switch>
            {routes.map(route =>
              <Route {...route} key={route.path} />
            )}
          </Switch>
        </StoreContext.Provider>
      </Router>
    );
  }
}

export default App
