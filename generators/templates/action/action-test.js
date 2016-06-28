import test from 'ava'

import action from './'

const state = {
  awesome: {
    isAwesome: true
  }
}

test('awesomeAction calls the correct reducer', t => {
  action.awesomeAction(undefined, state, (reducer, _action) => {
    t.is(reducer, 'awesome.reducers.awesomeReducer')
  })
})
