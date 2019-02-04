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

  handleQueryResponse(res: IResponse) {
    if (res.countries) {
      this.merge(...res.countries)
      this.loaded = true
    }

    if (res.country) {
      this.merge(res.country)
    }
  }
}
