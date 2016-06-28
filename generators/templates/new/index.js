const naka = require('naka')
const app = naka()

// Register actions and reducers
// app.register(require('./actions/hello'), 'action')
// app.register(require('./reducers/hello'), 'reducer')

// Register routes
app.router(route => [
  route('/', require('./containers/app'))
])

// Start the app
app.init()
