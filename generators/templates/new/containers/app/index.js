const h = require('naka').html

module.exports = (params, state, send) => {
  return h`
    <div>
      <div class="measure">
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
    </div>
  `
}
