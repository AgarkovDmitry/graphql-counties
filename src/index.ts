import DataStore from './store/data'

const store = new DataStore()

declare global {
  interface Window {
    store: IDataStore
  }
}

window.store = store
