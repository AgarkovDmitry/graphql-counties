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

  get code() {
    return this.props.match.params.code
  }

  get continent() {
    return this.root.continents.findByCode(this.code)
  }

  constructor(props) {
    super(props)
    this.root = props.store
  }

  componentDidMount() {
    this.root.query(`
      continent(code: ${JSON.stringify(this.code)}) {
        code
        name
        countries {
          code
          name
        }
      }
    `)
  }

  render() {
    return (
      <div className={ styles.root }>
        <div>
          Continent
        </div>
      </div>
    )
  }
}
