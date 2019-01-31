import { action, computed, observable } from 'mobx'

import Prototype from '../prototype'

export default class ContinentItem extends Prototype<IDataStore> {
  @observable name: string = ''
  @observable _countries: string[] = []

  @computed get countries() {
    if (this.root.countries.length === 0) {
      return []
    }

    return this._countries.map(code => this.root.countries.findByCode(code))
  }

  @action merge(payload) {
    if (payload.countries) {
      this.root.countries.merge(...payload.countries)
      this._countries = payload.countries.map(i => i.code)
    }

    return super.merge(payload)
  }
}
