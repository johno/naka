import test from 'ava'
import isPresent from 'is-present'

import hello from './'

const state = {
  hello: {
    title: 'Hi',
    from: 'yay',
    messages: [],
    count: 42
  }
}

test('it initializes with state', t => {
  t.true(isPresent(hello.state.messages))
})

test('setCount reduces state', t => {
  const newState = hello.reducers.setCount(
    { count: 100 },
    state
  )

  t.is(newState.hello.count, 100)
})

test('decrement calls the correct reducer', t => {
  hello.actions.decrement(undefined, state, (reducer, _action) => {
    t.is(reducer, 'hello.reducers.setCount')
  })
})

test('decrement returns the correct count', t => {
  hello.actions.decrement(undefined, state, (_reducer, action) => {
    t.is(action.count, state.hello.count - 1)
  })
})

test('increment calls the correct reducer', t => {
  hello.actions.increment(undefined, state, (reducer, _action) => {
    t.is(reducer, 'hello.reducers.setCount')
  })
})

test('increment returns the correct count', t => {
  hello.actions.increment(undefined, state, (_reducer, action) => {
    t.is(action.count, state.hello.count + 1)
  })
})
