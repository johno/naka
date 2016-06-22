const naka = require('../../')
const app = naka()

app.model(require('./models/hello'))

app.router(route => [
  route('/', require('./containers/app')),
  route('/other', require('./containers/other'))
])

app.init()
