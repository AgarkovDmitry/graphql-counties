import * as React from 'react'
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom'

import DataStore from './store/data'

declare global {
  interface Window {
    store: IDataStore
  }
}

const store = new DataStore()

window.store = store

const StoreContext = React.createContext(store)
const RouterContext = React.createContext<RouteComponentProps>(null)

export function StoreProvider({ children }) {
  return (
    <StoreContext.Provider value={ store }>
      { children }
    </StoreContext.Provider>
  )
}

export function Router({ children }) {
  return (
    <BrowserRouter>
      <Route>
        {
          (value) => (
            <RouterContext.Provider value={ value }>
              { children }
            </RouterContext.Provider>
          )
        }
      </Route>
    </BrowserRouter>
  )
}

export function useStore() {
  return React.useContext(StoreContext)
}

export function useRouter() {
  return React.useContext(RouterContext)
}
