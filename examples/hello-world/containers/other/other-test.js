import test from 'ava'
import app from './'

test('displays content', t => {
  const appHtml = app().toString()

  t.true(appHtml.includes('different page'))
})
