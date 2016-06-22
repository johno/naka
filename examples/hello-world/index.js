const naka = require('../../')
const app = naka()

// app.container(require('./containers/app'))

const appHtml = require('./containers/app')()
document.getElementById('naka-root').appendChild(appHtml)
