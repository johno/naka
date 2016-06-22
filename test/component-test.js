import test from 'ava'
import cp from 'child_process'
import isPresent from 'is-present'

import naka from '../'

const h = naka.html

test('renders a component', t => {
  t.plan(1)

  const foo = 'Hello, world!'

  const renderedComp = h`
    <h1>${foo}</h1>
  `

  t.is(renderedComp.tagName, 'H1')
})
