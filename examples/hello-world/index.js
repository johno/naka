const naka = require('../../')
const app = naka()

app.register(require('./reducers/hello'), 'reducer')
app.register(require('./actions/hello'), 'action')

app.router(route => [
  route('/', require('./containers/app')),
  route('/other', require('./containers/other'))
])

app.init()
