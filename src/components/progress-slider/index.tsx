import * as React from 'react'

const styles = require('./style.scss')

interface IProps {
  minValue: number
  maxValue: number
  className?: string
  onSelect: (values: { min: number, max: number }) => void
  disabled?: boolean
  id?: string
}

const move = (setter, x, width, left, right) => {
  if (x < left) {
    setter(0)
  } else if (x > right) {
    setter(100)
  } else {
    setter(Math.floor((100 * (x - left) / width)))
  }
}

export default function (props: IProps) {
  const [max, setMax] = React.useState(props.maxValue)
  const [min, setMin] = React.useState(props.minValue)
  const [key, setKey] = React.useState('')
  const [hasChanged, setHasChanged] = React.useState(false)
  const progressBarEl = React.useRef(null)

  React.useEffect(() => {
    const hangleMove = (e, pageX) => {
      if (key) {
        e.stopPropagation()
        e.preventDefault()
        e.cancelBubble = true
        e.returnValue = false

        const { left, right, width } = progressBarEl.current.getBoundingClientRect()

        if (key === 'min') {
          move(setMin, pageX, width, left, right)
          if (min > max) { setMax(min) }
        } else if (key === 'max') {
          move(setMax, pageX, width, left, right)
          if (max < min) { setMin(max) }
        }

        setHasChanged(true)

        window.getSelection().removeAllRanges()
      }

      return false
    }

    const touchMoveBox = (e) => hangleMove(e, e.touches[0].pageX)

    const dragBox = (e) => hangleMove(e, e.pageX)

    const reset = () => {
      setKey('')

      if (!hasChanged) {
        return
      }

      props.onSelect({ min, max })

      setHasChanged(false)
    }

    document.addEventListener('touchmove', touchMoveBox)
    document.addEventListener('mousemove', dragBox)
    document.addEventListener('touchend', reset)
    document.addEventListener('mouseup', reset)

    return () => {
      document.removeEventListener('touchmove', touchMoveBox)
      document.removeEventListener('mousemove', dragBox)
      document.removeEventListener('touchend', reset)
      document.removeEventListener('mouseup', reset)
    }
  })

  const selectMaxBox = () => {
    if (!props.disabled) {
      setKey('max')
    }
  }

  const selectMinBox = () => {
    if (!props.disabled) {
      setKey('min')
    }
  }

  return (
    <div className={ `${styles.skillBlock} ${props.className}` }>
      <div className={ styles.skillRepresantation }>
        <div className={ styles.progressBarWrap } ref={ progressBarEl }>
          <div className={ styles.progressBar }>
            <div className={ styles.emptyZone } />

            <div className={ styles.desiredBlock } style={ { width: `${max}%` } }>
              <div className={ styles.desiredZone } />
              <div className={ styles.desiredToggleConnector } />
              <div
                className={ props.disabled ? styles.desiredToggleCircle : styles.desiredToggleCircle }
                onMouseDown={ selectMaxBox }
                onTouchStart={ selectMaxBox }
              />
            </div>

            <div className={ styles.currentBlock } style={ { width: `${min}%` } }>
              <div className={ styles.completeZone } />
              <div className={ styles.currentToggleConnector } />
              <div
                className={ props.disabled ? styles.disabledCurrentToggleCircle : styles.currentToggleCircle }
                onMouseDown={ selectMinBox }
                onTouchStart={ selectMinBox }
              />
            </div>
          </div>
        </div>
        <div className={ styles.percentZone }>
          <div className={ styles.currentPercent }>
            {min}%
          </div>

          <div className={ styles.percentDelimeter }>
            /
          </div>

          <div className={ styles.desiredPercent }>
            {max}%
          </div>
        </div>
      </div>
    </div>
  )
}
