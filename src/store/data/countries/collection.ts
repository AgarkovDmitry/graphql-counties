import Collection from '../collection'
import Item from './item'

interface IResponse {
  countries?: any[]
  country?: any
}

export default class CountryCollection extends Collection<IDataStore, Item> {
  generate (payload) {
    return new Item(this.root, payload).merge(payload)
  }

  handleQueryResponse(res: IResponse, query: string) {
    if (res.countries) {
      super.handleQueryResponse(res, query)
      this.merge(...res.countries)
    }

    if (res.country) {
      super.handleQueryResponse(res, query)
      this.merge(res.country)
    }
  }
}
