import Collection from '../collection'
import Item from './item'

interface IResponse {
  continents?: any[]
  continent?: any
}

export default class ContinentCollection extends Collection<IDataStore, Item> {
  generate (payload) {
    return new Item(this.root, payload).merge(payload)
  }

  handleQueryResponse(res: IResponse, query: string) {
    if (res.continents) {
      super.handleQueryResponse(res, query)
      this.merge(...res.continents)
    }

    if (res.continent) {
      super.handleQueryResponse(res, query)
      this.merge(res.continent)
    }
  }
}
