import { action, computed, observable } from 'mobx'

import Prototype from '../prototype'

export default class CountryItem extends Prototype<IDataStore> {
  @observable name: string = ''
  @observable native: string = ''
  @observable phone: string = ''
  @observable currency: string = ''
  @observable emoji: string = ''
  @observable emojiU: string = ''

  @observable _languages: string[] = []
  @observable _continent: string = ''

  @computed get languages() {
    if (this.root.languages.length === 0) {
      return []
    }

    return this._languages.map(code => this.root.languages.findByCode(code))
  }

  @computed get continent() {
    if (!this._continent) {
      return null
    }

    return this.root.continents.findByCode(this._continent)
  }

  @action merge(payload) {
    if (payload.languages) {
      this.root.languages.merge(...payload.languages)
      this._languages = payload.languages.map(i => i.code)
    }

    if (payload.continent) {
      this.root.continents.merge(payload.continent)
      this._continent = payload.continent.code
    }

    return super.merge(payload)
  }
}
