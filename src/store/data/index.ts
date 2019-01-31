import axios from 'axios'

import ContinentCollection from './continents/collection'
import CountryCollection from './countries/collection'
import LanguageCollection from './languages/collection'

const endpoint = 'https://countries.trevorblades.com/'

interface IResponse {
  continents?: any[]
  continent?: any
  countries?: any[]
  country?: any
  languages?: any[]
  language?: any
}

export default class DataStore {
  continents: ContinentCollection
  countries: CountryCollection
  languages: LanguageCollection

  constructor() {
    this.continents = new ContinentCollection(this)
    this.countries = new CountryCollection(this)
    this.languages = new LanguageCollection(this)
  }

  async query(query: string, variables: any = {}) {
    // add caching...
    const res = await axios.post(endpoint, { operationName: null, query, variables })
    this.handleQueryResponse(res.data.data)
  }

  handleQueryResponse(res: IResponse) {
    this.continents.handleQueryResponse(res)
    this.countries.handleQueryResponse(res)
    this.languages.handleQueryResponse(res)
  }
}

declare global {
  class IDataStore extends DataStore {}
}
