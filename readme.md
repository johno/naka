# naka [![Build Status](https://secure.travis-ci.org/johnotander/naka.svg?branch=master)](https://travis-ci.org/johnotander/naka) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

A minimalist front end framework.

#### How is `naka` different?

Naka seeks to blend the best parts of popular front end frameworks while remaining opinionated and minimal.

#### What does `naka` offer?

- an ergonomic cli
- an emphasis on testing
- a miniscule footprint
- global state that is easy
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
```

#### Components

A naka component is nothing more than a function that returns a template string.

```js
const h = require('naka/html')
const toPercent = require('to-percent')

module.exports = ({ foo, bar}) => h`
  <h1 class="f4 mt2">
    ${foo} <br>
    <small>
      ${toPercent(bar)}
    </small>
  </h1>
`
```

A component always comes with a test

```js
import test from 'ava'
import comp from './'

test('parses the percentage', t => {
  const compHtml = comp({ foo: 'baz', bar: 0.12 })
  t.true(compHtml.includes('12%'))
})


test('adds an h1', t => {
  const compHtml = comp({ foo: 'baz', bar: 0.12 })
  t.true(compHtml.includes('<h1>baz'))
})
```

## Architecture

Naka attempts to use convention to remove boilerplate.
All elements have their own directory with an index.js and element-name-test.js.
This ensures that the test lives next to the module that it tests.

```
app-name/
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
  models/
      |
      |
      my-model/
          |
          |
          `index.js
          `my-model-test.js
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
