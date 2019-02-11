import * as React from 'react'

import { Link } from 'react-router-dom'

const styles = require('./style.scss')

export default class AddBranchPage extends React.Component {
  render() {
    return (
      <div className={ styles.root }>
        <Link to='/continents' className={ styles.link }>Continents</Link>
        <Link to='/test-page' className={ styles.link }>Test page</Link>
        {/* <Link to='continents'>Continents</Link> */}
      </div>
    )
  }
}
