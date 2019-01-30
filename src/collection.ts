import { action, computed, observable } from 'mobx'
import Item from './prototype'


export default class Collection<Root, T extends Item<Root>> {
  protected root: Root

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

  findById(id) {
    return this.data.find(item => item.id === id)
  }

  removeById(id) {
    const index = this.data.findIndex(item => item.id === id)
    if (index !== -1) {
      this.data.splice(index, 1)
    }
  }

  @action clear () {
    this.data.splice(0, this.length)
  }

  @action merge (...items) {
    items.forEach(i => {
      const item = this.findById(i.id)

      if (!item) {
        return
      }

      item.merge(i)
    })
    this.data.push(
      ...items
      .filter(i => !this.findById(i.id))
      .map(item => this.generate(item))
    )
  }
}
