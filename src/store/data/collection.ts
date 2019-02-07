import { action, computed, observable } from 'mobx'
import Item from './prototype'

export default class Collection<Root, T extends Item<Root>> {
  protected root: Root
  @observable cachedQueries: string[] = []

  @observable data: T[] = []

  @computed get length () {
    return this.data.length
  }

  @computed get snapshot() {
    return this.data.map(item => item.snapshot)
  }

  constructor(root: Root) {
    this.root = root
  }

  protected generate (payload) {
    return new Item(this.root, payload).merge(payload) as T
  }

  shouldQueryBeFetched(query: string) {
    return !this.cachedQueries.find(q => q === query)
  }

  cacheQuery(query: string) {
    const index = this.cachedQueries.findIndex(q => q === query)
    if (index !== -1) {
      this.cachedQueries.splice(index, 1)
    }

    this.cachedQueries.push(query)
  }

  handleQueryResponse(res: any, query: string) {
    this.cacheQuery(query)
  }

  findByCode(code: string) {
    return this.data.find(item => item.code === code)
  }

  @action clear () {
    this.data.splice(0, this.length)
  }

  @action merge (...items) {
    items.forEach(i => {
      const item = this.findByCode(i.code)

      if (!item) {
        return
      }

      item.merge(i)
    })
    this.data.push(
      ...items
      .filter(i => !this.findByCode(i.code))
      .map(item => this.generate(item))
    )
  }
}
