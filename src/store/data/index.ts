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

  private get collections() {
    return [
      this.continents,
      this.countries,
      this.languages
    ]
  }

  constructor() {
    this.continents = new ContinentCollection(this)
    this.countries = new CountryCollection(this)
    this.languages = new LanguageCollection(this)
  }

  shouldQueryBeFetched(query: string, refetch?: boolean) {
    return refetch || this.collections.reduce((res, col) => res && col.shouldQueryBeFetched(query), true)
  }

  async query(query: string, variables: any = {}, refetch?: boolean) {
    if (this.shouldQueryBeFetched(query, refetch)) {
      //handle variables cache
      const res = await axios.post(endpoint, { operationName: null, query, variables })
      this.handleQueryResponse(res.data.data, query)
    }
  }

  handleQueryResponse(res: IResponse, query: string) {
    this.continents.handleQueryResponse(res, query)
    this.countries.handleQueryResponse(res, query)
    this.languages.handleQueryResponse(res, query)
  }
}

declare global {
  class IDataStore extends DataStore {}
}
