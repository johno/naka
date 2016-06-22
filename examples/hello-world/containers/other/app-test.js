import test from 'ava'
import app from './'

test('it says hello', t => {
  const appHtml = app().toString()

  t.true(appHtml.includes('Hello, world!'))
})
