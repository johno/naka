const h = require('../../../../').html

module.exports = (params, state, send) => {
  const hello = state.hello

  return h`
    <div>
      <h1 class="pb4">
        ${hello.title} ${hello.from}
      </h1>
      <button onclick=${e => send('hello.actions.decrement')}>-</button>
      ${hello.count}
      <button onclick=${e => send('hello.actions.increment')}>+</button>
      <p class="f6">Click +/- to change state</p>
      <h3 class="f-subheadline">
        The count is <code class="f-headline">${hello.count}</code>
      </h3>
    </div>
  `
}
