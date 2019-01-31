import { action, computed, isComputedProp, isObservableArray, isObservableMap, isObservableProp, toJS } from 'mobx'

export default class Prototype<Root> {
  protected root: Root
  code: string

  constructor(root, payload) {
    this.root = root
    this.code = payload.code
  }

  @computed get snapshot() {
    const res = { code: this.code }

    Object
      .keys(this)
      .filter(i => isObservableProp(this, i))
      .forEach(prop => res[prop] = toJS(this[prop]))

    return res
  }

  @action merge(payload) {
    if (!payload) {
      return
    }

    Object.keys(payload).forEach(key => {
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
      } else if (isObservableProp(this, key) && this[key] !== payload[key]) {
        this[key] = payload[key]
      }
    })

    return this
  }
}
