const isPresent = require('is-present')
const sendAction = require('send-action')
const yo = require('yo-yo')
const sr = require('sheet-router')

module.exports = naka
naka.html = require('yo-yo')

function naka () {
  const models = {}
  const state = {}

  let r = null
  let appHtml = ''

  init.model = model
  init.router = router
  init.init = init
  return init

  function model (m) {
    models[m.name]

    if (isPresent(state[m.name])) {
      console.error(`
        There are conflicting models with name ${m.name}
      `)
    }

    // Set initial state during model registration
    state[m.name] = m.state
  }

  function router (cb) {
    r = sr(cb)
    return r
  }

  function init () {
    const dispatch = sendAction({
      onaction: function (action, state) {
        console.log(action)
        const [model, actionType] = action.type.split('.')
        dotProp(`${model}.
        
        return state
      },

      onchange: function (action, state, prevState) {
        console.log(action)
        if (newState === prevState) return

        const oldDOM = document.getElementById('naka-root')
        const newTree = r(window.location.pathname, newState, dispatch)
        newTree.setAttribute('id', 'naka-root')
        yo.update(oldTree, newTree)
      },

      state: state
    })

    document
      .getElementById('naka-root')
      .appendChild(r(window.location.pathname, state, dispatch))
  }
}
