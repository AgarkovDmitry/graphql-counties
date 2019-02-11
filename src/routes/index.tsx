import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navigation from 'containers/navigation'

import ContinentPage from './continent'
import ContinentsPage from './continents'
import TestPage from './test-page'

const styles = require('./style.scss')

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div className={ styles.root }>
          <Navigation />
          <Switch>
            <Route path='/continents/:code' component={ ContinentPage } />
            <Route path='/continents' component={ ContinentsPage } />
            <Route path='/countries/:code' component={ () => <div> countrie </div> } />
            <Route path='/countries' component={ () => <div> countries </div> } />
            <Route path='/languages/:code' component={ () => <div> language </div> } />
            <Route path='/languages' component={ () => <div> languages </div> } />
            <Route path='/test-page' component={ TestPage } />
          </Switch>
        </div>
      </Router>
    )
  }
}
