import { action, computed, isComputedProp, isObservableArray, isObservableMap, isObservableProp, toJS } from 'mobx'

export default class Prototype<Root> {
  protected root: Root
  id: number

  constructor(root, payload) {
    this.root = root
    this.id = payload.id
  }

  @computed get snapshot() {
    const keys = Object.keys(this)

    const properties = keys.filter(i => isObservableProp(this, i))

    const res = { id: this.id }

    properties.forEach(prop => res[prop] = toJS(this[prop]))

    return res
  }

  @action merge(payload) {
    if (!payload) {
      return
    }

    const keys = Object.keys(payload)

    keys.forEach(key => {
      if (isComputedProp(this, key)) {
        return
      }

      if (isObservableArray(this[key])) {
        this[key].splice(0, this[key].length, ...payload[key])
      } else if (isObservableMap(this[key])) {
        this[key].clear()
        Object
          .keys(payload[key])
          .forEach(nestedKey => this[key].set(nestedKey, payload[key][nestedKey]))
      } else if (isObservableProp(this, key)) {
        this[key] = payload[key]
      }
    })

    return this
  }
}
