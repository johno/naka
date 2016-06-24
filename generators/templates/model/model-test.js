import test from 'ava'

import model from './'

const state = {
  awesome: {
    isAwesome: true
  }
}

test('it initializes with state', t => {
  t.true(model.state.isAwesome)
})

test('awesomeReducer reduces state', t => {
  const newState = model.reducers.awesomeReducer(
    { isAwesome: false },
    state
  )

  t.false(newState.awesome.isAwesome)
})

test('awesomeAction calls the correct reducer', t => {
  model.actions.awesomeAction(undefined, state, (reducer, _action) => {
    t.is(reducer, 'awesome.reducers.awesomeReducer')
  })
})
