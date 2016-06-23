const isPresent = require('is-present')
const sendAction = require('send-action')
const dotProp = require('dot-prop')
const extend = require('xtend')
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
    models[m.name] = m

    if (isPresent(state[m.name])) {
      console.error(`There are conflicting models with name ${m.name}`)
    }

    state[m.name] = m.state
  }

  function router (cb) {
    r = sr(cb)
    return r
  }

  function init () {
    const dispatch = sendAction({
      onaction: handleAction,
      onchange: handleChange,
      state: state
    })

    function handleAction (action, state) {
      const func = dotProp.get(models, action.type)
      const [modelName, actionOrReducer, _func] = action.type.split('.')

      if (actionOrReducer === 'actions') {
        return func(action, state, dispatch)
      } else {
        const mutatedState = {}
        mutatedState[modelName] = func(action, state, dispatch)

        const newState = extend(state, mutatedState)
        handleChange(undefined, newState, state)
      }
    }

    function handleChange (action, state, prevState) {
      if (state === prevState) return

      const oldTree = document.getElementById('naka-root')
      const newTree = r(window.location.pathname, state, dispatch)
      newTree.setAttribute('id', 'naka-root')
      yo.update(oldTree, newTree)
    }

    document
      .getElementById('naka-root')
      .appendChild(r(window.location.pathname, state, dispatch))
  }
}
