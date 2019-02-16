import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Routes from './routes'
import DataStore from './store/data'

import { Router, StoreProvider } from './context'

const store = new DataStore()

declare global {
  interface Window {
    store: IDataStore
  }
}

window.store = store

ReactDOM.render(
  <StoreProvider>
    <Router>
      <Routes />
    </Router>
  </StoreProvider>,
  document.getElementById('root')
)
