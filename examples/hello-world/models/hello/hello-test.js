import test from 'ava'
import isPresent from 'is-present'

import hello from './'

test('it initializes with state', t => {
  t.true(isPresent(hello.state.messages))
})
