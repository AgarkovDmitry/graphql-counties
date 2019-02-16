import * as React from 'react'

import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import { useStore } from 'context'

const styles = require('./style.scss')

export default observer(function() {
  const store = useStore()

  React.useEffect(() => {
    store.query(`
      {
        continents {
          code
          name
        }
      }
    `)
  })

  return (
    <div className={ styles.root }>
      <div>
        Continents
      </div>
      <div>
        {
          store.continents.data.map(continent => (
            <div key={ continent.code }>
              <div> {continent.code} </div>
              <div> {continent.name} </div>
              <Link to={ `/continents/${continent.code}` }> View More </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
})
