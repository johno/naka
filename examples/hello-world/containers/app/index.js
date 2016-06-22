const h = require('../../../../').html

module.exports = (params, state, send) => {
  console.log(state)
  console.log(send)
  return h`
    <div>
      <h1 class="pb4">
        ${state.hello.title} ${state.hello.from}
      </h1>
      <button onclick=${e => send('hello.decrement')}>-</button>
      ${state.hello.count}
      <button onclick=${e => send('hello.increment')}>+</button>
      <p class="f6">Click +/- to change state</p>
      <h3 class="f-subheadline">
        The count is <code class="f-headline">${state.hello.count}</code>
      </h3>
    </div>
  `
}
