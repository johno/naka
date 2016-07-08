# naka [![Build Status](https://secure.travis-ci.org/johnotander/naka.svg?branch=master)](https://travis-ci.org/johnotander/naka) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

__Work in progress__

A minimalist front end framework.

#### How is `naka` different?

Naka seeks to blend the best parts of other popular front end frameworks while remaining opinionated and minimal.
It heavily relies on `morphdom`, `bel`, and `yo-yo` (naka/morphdom/bel/yo-yo => NMBY stack).
Naka uses a minimal redux flow with global state (via `send-action`).
A lot of time has also been spent on integrating testing and creating a powerful CLI.

This framework is _heavily_ based on [`choo`](https://github.com/yoshuawuyts/choo) (read: steals from choo).
It primarily diverges in the redux data flow, only supporting the traditional flow (no subscriptions or effects).
Naka also uses a container/component pattern where components should be purely presentational while containers handle actions/state/etc.

Server side rendering has been supported from the beginning, allowing users without a JS environment to also receive a first class experience.
Routing is also supported so urls and browser history ensure a consistent and predictable experience.

#### What does `naka` offer?

- an ergonomic cli
- an emphasis on testing
- a miniscule footprint
- routing api
- components
- event handling
- 100% js (no jsx or hbs)
- global state
- live reloading in dev
- production build step via the cli
- universal rendering
- pluggable api

#### Where'd the name come from?

When writing this readme, I randomly opened Iterating Grace to look for name inspiration.
I happened on the page listing Koons Crooks' list of prior companies.
One was named naka.
It was short, sweet, and was a nice word in other languages.
Naka also happens to be pleasant to type.

## Installation

```bash
npm install -g naka
```

## Usage

```javascript
naka -h

  A minimalist front end framework

  Usage
    $ naka <command> <options...>

  Commands
    $ naka new <name> - Create a new app
    $ naka generate <blueprint> - Item to generate
    $ naka serve - Serve the app
    $ naka test - Run the test suite
    $ naka build <options...> - Build the app

  Examples
    $ naka -h
    $ naka new awesome-app
    $ naka t
    $ naka generate model user
    $ naka build -prod
```

#### Components

A naka component is nothing more than a function that returns a template string.

```js
const h = require('naka/html')
const toPercent = require('to-percent')

module.exports = (params, state, dispatch) => {
  const foo = state.foo

  return h`
    <div>
      <h1 class="f4 mt2">
        ${foo.title} <br>
        <small>
          ${toPercent(foo.bar)}
        </small>
      </h1>
      <button onclick=${e => dispatch('foo.actions.myAction')}>
        Hi
      </button>
    </div>
  `
}
```

A component always comes with a test

```js
import test from 'ava'
import comp from './'

const state = { foo: { title: 'baz', bar: 0.12 } }
test('parses the percentage', t => {
  const compHtml = comp(state)
  t.true(compHtml.includes('12%'))
})


test('adds an h1', t => {
  const compHtml = comp(state)
  t.true(compHtml.includes('<h1>baz'))
})
```

#### Reducers

Reducers receive data and use that information to modify the global state.
A reducer can also be used to set the initial state.
When state changes, the new DOM is drawn and updated with `yo-yo`.

```js
module.exports = {
  name: 'counter',

  state: {
    count: 0
  },

  setCount: (action, state) => {
    state.counter.count = action.count
    return state
  }
}
```

Of course, the reducer also comes with a test.

```js
import test from 'ava'
import isPresent from 'is-present'

import hello from './'

const state = {
  hello: {
    count: 42
  }
}

test('initializes with state', t => {
  t.true(isPresent(hello.state.count))
})

test('setCount reduces state', t => {
  const newState = hello.setCount(
    { count: 100 },
    state
  )

  t.is(newState.hello.count, 100)
})
```

#### Actions

Actions receive an event, the current state, and the dispatch method.
They do work, often times an API call, and then dispatch a reducer with any relevant information.
Actions don't modify state directly.

```js
module.export = {
  name: 'counter',

  decrement: (action, state, dispatch) => (
    dispatch('counter.reducers.setCount', {
      count: state.counter.count - 1
    })
  ),

  increment: (action, state, dispatch) => (
    dispatch('counter.reducers.setCount', {
      count: state.counter.count + 1
    })
  )
}
```

The test :dancers: :sunglasses:

```js
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
```

#### Constructing the app

Every generated app has an `index.js` file, this is the entry point of the app. 
Before initializing the app, you must register your models and routes.
Then, the app is started by calling `app.init()`.

```js
const naka = require('naka')
const app = naka()

app.register(require('./reducers/hello'), 'reducer')
app.register(require('./actions/hello'), 'action')

app.router(route => [
  route('/', require('./containers/app')),
  route('/users', require('./containers/users'))
])

app.init()
```

## Architecture

Naka attempts to use convention to remove boilerplate.
All elements have their own directory with an index.js and element-name-test.js.
This ensures that the test lives next to the module that it tests.

```
app-name/
  |
  |
  containers/
      |
      |
      my-container/
          |
          |
          `index.js
          `my-container-test.js
  |
  |
  components/
      |
      |
      my-component/
          |
          |
          `index.js
          `my-component-test.js
  |
  |
  actions/
      |
      |
      my-action/
          |
          |
          `index.js
          `my-action-test.js
  |
  |
  reducers/
      |
      |
      my-reducer/
          |
          |
          `index.js
          `my-reducer-test.js
  |
  |
  `index.html
  `package.json
  `app.js
  `routes.js
``` 

## License

MIT

## Related

There are numerous libraries that naka uses and draws inspiration from.
Thank you to all the contributors that have been involved.

#### Dependencies

- [`yo-yo`](https://github.com/maxogden/yo-yo)
- [`meow`](https://github.com/sindresorhus/meow)
- [`ava`](https://github.com/sindresorhus/ava)
- [`browserify`](https://github.com/substack/node-browserify)
- [`budo`](https://github.com/mattdesl/budo)
- [`send-action`](https://github.com/sethvincent/send-action)
- [`sheet-router`](https://github.com/yoshuawuyts/sheet-router)
- [`minitachyons`](https://github.com/johnotander/minitachyons)

#### Inspiration

- [`choo`](https://github.com/yoshuawuyts/choo)
- [`redux`](https://github.com/reactjs/redux)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
