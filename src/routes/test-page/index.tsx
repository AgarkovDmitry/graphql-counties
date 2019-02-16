import * as React from 'react'

import ProgressSlider from 'components/progress-slider'

const styles = require('./style.scss')

export default function() {
  const [priceRange, setPriceRange] = React.useState({ min: 20, max: 80 })

  console.log(priceRange)

  return (
    <div className={ styles.root }>
      <div>
        Some UI components written with hooks
        <ProgressSlider
          minValue={ priceRange.min }
          maxValue={ priceRange.max }
          onSelect={ setPriceRange }
        />
      </div>
    </div>
  )
}
