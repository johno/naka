import test from 'ava'
import isPresent from 'is-present'

import hello from './'

const state = {
  hello: {
    count: 42
  }
}

test('decrement calls the correct reducer', t => {
  hello.decrement(undefined, state, (reducer, _action) => {
    t.is(reducer, 'hello.reducers.setCount')
  })
})

test('decrement returns the correct count', t => {
  hello.decrement(undefined, state, (_reducer, action) => {
    t.is(action.count, state.hello.count - 1)
  })
})

test('increment calls the correct reducer', t => {
  hello.increment(undefined, state, (reducer, _action) => {
    t.is(reducer, 'hello.reducers.setCount')
  })
})

test('increment returns the correct count', t => {
  hello.increment(undefined, state, (_reducer, action) => {
    t.is(action.count, state.hello.count + 1)
  })
})
