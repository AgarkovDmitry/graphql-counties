import * as React from 'react'

import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'

const styles = require('./style.scss')

interface IProps {
  history?: any
  match?: any
}

@withRouter
@inject('store')
@observer
export default class AddBranchPage extends React.Component<IProps> {
  root: IDataStore

  get continents() {
    return this.root.continents.data
  }

  constructor(props) {
    super(props)
    this.root = props.store
  }

  componentDidMount() {
    if (this.root.continents.loaded) {
      return
    }

    this.root.query(`
      continents {
        code
        name
      }
    `)
  }

  render() {
    return (
      <div className={ styles.root }>
        <div>
          Continents
        </div>
        <div>
          {
            this.continents.map(continent => (
              <div key={ continent.code }>
                <div> {continent.code} </div>
                <div> {continent.name} </div>
                <Link to={ `/continents/${continent.code}` }> View More </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
