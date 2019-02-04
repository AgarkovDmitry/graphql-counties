import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/continents/:code' component={ () => <div> continent </div> } />
          <Route path='/continents' component={ () => <div> continents </div> } />
          <Route path='/countries/:code' component={ () => <div> countrie </div> } />
          <Route path='/countries' component={ () => <div> countries </div> } />
          <Route path='/languages/:code' component={ () => <div> language </div> } />
          <Route path='/languages' component={ () => <div> languages </div> } />
        </Switch>
      </Router>
    )
  }
}
