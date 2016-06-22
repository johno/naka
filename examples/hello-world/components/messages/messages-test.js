import test from 'ava'
import messages from './'

const messageList = ['foo', 'bar']

test('it renders messages', t => {
  const compHtml = messages(messageList)

  t.true(compHtml.includes('<p>foo</p>'))
  t.true(compHtml.includes('<p>bar</p>'))
})

test('it prompts to create a message if none exist', t => {
  const compHtml = messages().toString()

  t.true(compHtml.includes('create a message'))
})
