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

  handleQueryResponse(res: IResponse) {
    if (res.languages) {
      this.merge(...res.languages)
    }

    if (res.language) {
      this.merge(res.language)
    }
  }
}
