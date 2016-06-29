const h = require('naka').html

module.exports = (params, state, dispatch) => {
  const hello = state.hello

  return h`
    <div>
      <div class="measure center">
        <h1 class="pb4 f-subheadline">
          Hello, world!
        </h1>
        <p class="f3">
          <code>naka</code> is a minimalist front end framework that uses vanilla JavaScript.
        </p>
        <p class="f3">
          Check the repository out on <a href="https://github.com/johnotander/naka">GitHub</a>
          for more documentation. If you run into any problems or bugs, please open up an issue.
        </p>
        <p class="f3">
          Here's an example using the redux flow to modify state.
        </p>
        <button onclick=${e => dispatch('hello.actions.decrement')}>-</button>
          ${hello.count}
        <button onclick=${e => dispatch('hello.actions.increment')}>+</button>
        <p class="f3">
          The current count is ${hello.count}.
        </p>
        <p class="f3">
          An action increments or decrements the count and then calls a reducer to update the
          global state. Whenever the global state is mutated, a new DOM is built, diffed, and
          then re-rendered.
        </p>
    </div>
  `
}
