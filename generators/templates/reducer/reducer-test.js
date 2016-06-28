import test from 'ava'

import reducer from './'

const state = {
  awesome: {
    isAwesome: true
  }
}

test('it initializes with state', t => {
  t.true(reducer.state.isAwesome)
})

test('awesomeReducer reduces state', t => {
  const newState = reducer.awesomeReducer(
    { isAwesome: false },
    state
  )

  t.false(newState.awesome.isAwesome)
})
