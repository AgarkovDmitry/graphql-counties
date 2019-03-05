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

interface IReducerState {
  min: number
  max: number
  hasChanged: boolean
  key: string
}

function reducer(state: IReducerState, { type, payload }: { type: string, payload?: any }): IReducerState {
  switch (type) {
    case 'move': {
      return { ...state, min: payload.min, max: payload.max, hasChanged: true }
    }

    case 'setKey': {
      return { ...state, key: payload.key }
    }

    case 'reset': {
      return { ...state, key: '', hasChanged: false }
    }
  }
}

function move (x: number, width: number, left: number, right: number) {
  if (x < left) {
    return 0
  }

  if (x > right) {
    return 100
  }

  return Math.floor((100 * (x - left) / width))
}

export default function (props: IProps) {
  const progressBarEl = React.useRef(null)
  const [state, dispatch] = React.useReducer(reducer, { min: props.minValue, max: props.maxValue, hasChanged: false, key: '' })
  const { min, max, key, hasChanged } = state

  React.useEffect(() => {
    const hangleMove = (e, pageX) => {
      if (!key) {
        return
      }

      e.stopPropagation()
      e.preventDefault()
      e.cancelBubble = true
      e.returnValue = false

      const { left, right, width } = progressBarEl.current.getBoundingClientRect()

      const movedValue = move(pageX, width, left, right)

      let _min = min
      let _max = max

      if (key === 'min') {
        _min = movedValue
        _max = movedValue > max ? movedValue : max
      } else if (key === 'max') {
        _min = movedValue < min ? movedValue : min
        _max = movedValue
      }

      dispatch({ type: 'move', payload: { min: _min, max: _max } })

      window.getSelection().removeAllRanges()

      return false
    }

    const touchMoveBox = (e) => hangleMove(e, e.touches[0].pageX)

    const dragBox = (e) => hangleMove(e, e.pageX)

    const reset = () => {
      if (hasChanged) {
        props.onSelect({ min, max })
      }

      dispatch({ type: 'reset' })
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
      dispatch({ type: 'setKey', payload: { key: 'max' } })
    }
  }

  const selectMinBox = () => {
    if (!props.disabled) {
      dispatch({ type: 'setKey', payload: { key: 'min' } })
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
