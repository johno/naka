'use strict'

const isPresent = require('is-present')
const sendAction = require('send-action')
const dotProp = require('dot-prop')
const extend = require('xtend')
const yo = require('yo-yo')
const sr = require('sheet-router')
const href = require('sheet-router/href')

module.exports = naka
naka.html = require('yo-yo')

function naka () {
  const _dataFlow = {}
  const _state = {}

  var _router = null

  init.register = register
  init.router = router
  init.init = init
  return init

  function register (mod, type) {
    if (type !== 'action' && type !== 'reducer') {
      throw new TypeError('naka#register received an unknown type, please specify action/reducer')
    }

    dotProp.set(_dataFlow, `${mod.name}.${type}s`, mod)

    if (type === 'reducer') {
      _state[mod.name] = mod.state
    }
  }

  function router (cb) {
    _router = sr(cb)
    return _router
  }

  function init () {
    const dispatch = sendAction({
      onaction: handleAction,
      onchange: handleChange,
      state: _state
    })

    href(function (location) {
      const newState = extend(_state, { location })
      handleChange(undefined, newState, _state)
    })

    function handleAction (action, state) {
      const func = dotProp.get(_dataFlow, action.type)
      const [modelName, actionOrReducer, _func] = action.type.split('.')

      if (actionOrReducer === 'actions') {
        return func(action, state, dispatch)
      } else if (actionOrReducer === 'reducers') {
        const mutatedState = {}
        mutatedState[modelName] = func(action, state, dispatch)

        const newState = extend(state, mutatedState)
        return newState
      }
    }

    function handleChange (action, state, prevState) {
      if (state === prevState) return

      const oldTree = document.getElementById('naka-root')
      const newTree = _router(state.location, state, dispatch)
      newTree.setAttribute('id', 'naka-root')
      yo.update(oldTree, newTree)
    }

    _state.location = window.location.pathname

    document
      .getElementById('naka-root')
      .appendChild(_router(window.location.pathname, _state, dispatch))
  }
}
