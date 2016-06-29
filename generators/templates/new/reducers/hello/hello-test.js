import test from 'ava'
import isPresent from 'is-present'

import hello from './'

const state = {
  hello: {
    count: 42
  }
}

test('it initializes with state', t => {
  t.true(isPresent(hello.state.count))
})

test('setCount reduces state', t => {
  const newState = hello.setCount(
    { count: 100 },
    state
  )

  t.is(newState.hello.count, 100)
})
