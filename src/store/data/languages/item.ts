import { observable } from 'mobx'

import Prototype from '../prototype'

export default class SkillItem extends Prototype<IDataStore> {
  @observable name: string = ''
  @observable native: string = ''
  @observable rtl: number = 0
}
