import * as React from 'react'

import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

import ProgressSlider from 'components/progress-slider'

const styles = require('./style.scss')

interface IProps {
  history?: any
  match?: any
}

@withRouter
@inject('store')
@observer
export default class AddBranchPage extends React.Component<IProps> {
  render() {
    return (
      <div className={ styles.root }>
        <div>
          Some UI components written with hooks
          <ProgressSlider
            minValue={ 20 }
            maxValue={ 80 }
            onSelect={ console.log }
          />
        </div>
      </div>
    )
  }
}
