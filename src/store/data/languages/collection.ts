import Collection from '../collection'
import Item from './item'

interface IResponse {
  languages?: any[]
  language?: any
}

export default class LanguageCollection extends Collection<IDataStore, Item> {
  generate (payload) {
    return new Item(this.root, payload).merge(payload)
  }

  handleQueryResponse(res: IResponse, query: string) {
    if (res.languages) {
      super.handleQueryResponse(res, query)
      this.merge(...res.languages)
    }

    if (res.language) {
      super.handleQueryResponse(res, query)
      this.merge(res.language)
    }
  }
}
