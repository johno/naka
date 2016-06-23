import test from 'ava'
import app from './'

test('it says hello', t => {
  const state = {
    hello: {
      title: 'Hello, world!'
    }
  }

  const appHtml = app(undefined, state).toString()

  t.true(appHtml.includes('Hello'))
})
