const naka = require('naka')
const app = naka()

// Register a model with
// app.model(require('./models/hello'))

// Register routes
app.router(route => [
  route('/', require('./components/app'))
])

// Start the app
app.init()
