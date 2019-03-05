import * as React from 'react'

import ProgressSlider from 'components/progress-slider'

const styles = require('./style.scss')

function loadTodos(offset = 0) {
  const todoList = ['plant tree', 'grow up son', 'build house']

  return new Promise<string[]>(res => {
    setTimeout(() => {
      res(todoList)
    }, 1500)
  })
}

interface ITodosState {
  todos: string[]
  isLoading: boolean
  offset: number
}

function useTodos () {
  const [state, setState] = React.useState<ITodosState>({ todos: [], isLoading: false, offset: 0 })
  const { todos, isLoading, offset } = state

  return {
    todos,
    isLoading,

    async load() {
      setState({
        ...state,
        isLoading: true
      })

      const res = await loadTodos(offset)

      setState({
        todos: [...todos, ...res],
        offset: offset + 1,
        isLoading: false
      })
    },

    reset () {
      setState({
        ...state,
        todos: [],
        offset: 0
      })
    }
  }
}

export default function() {
  const [priceRange, setPriceRange] = React.useState({ min: 20, max: 80 })

  const todoStore = useTodos()

  React.useEffect(() => {
    todoStore.load()
  }, [])

  console.log('rerender')

  return (
    <div className={ styles.root }>
      <div>
        Some UI components written with hooks

        <button onClick={ todoStore.load } disabled={ todoStore.isLoading }> load todos </button>
        <button onClick={ todoStore.reset } disabled={ todoStore.isLoading }> reset todos </button>

        {
          todoStore.todos.map((todo,  key) => (
            <div key={ `${todo}-${key}` }> { todo } </div>
          ))
        }

        <ProgressSlider
          minValue={ priceRange.min }
          maxValue={ priceRange.max }
          onSelect={ setPriceRange }
        />
      </div>
    </div>
  )
}
