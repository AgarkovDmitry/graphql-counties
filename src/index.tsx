import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Provider } from 'mobx-react'

import Routes from './routes'
import DataStore from './store/data'

const store = new DataStore()

declare global {
  interface Window {
    store: IDataStore
  }
}

window.store = store

ReactDOM.render(
  <Provider store={ store }>
    <Routes />
  </Provider>,
  document.getElementById('root')
)
