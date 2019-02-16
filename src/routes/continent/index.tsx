import * as React from 'react'

import { observer } from 'mobx-react-lite'
import { withRouter } from 'react-router-dom'

import { useStore } from 'context'

const styles = require('./style.scss')

export default withRouter(observer(function(props: { match?: any }) {
  const store = useStore()

  const code = props.match.params.code

  const continent = store.continents.findByCode(code)

  React.useEffect(() => {
    store.query(`
      {
        continent(code: ${JSON.stringify(code)}) {
          code
          name
          countries {
            code
            name
          }
        }
      }
    `)
  })

  return (
    <div className={ styles.root }>
      <div>
        Continent
      </div>
      {
        continent && <div>
          { continent.name }
          { continent.code }
          { continent.countries.map(country => (
            <div key={ country.code }>
              { country.name }
            </div>
          )) }
        </div>
      }
    </div>
  )
}))
