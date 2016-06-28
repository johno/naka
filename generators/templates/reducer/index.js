module.exports = {
  name: 'awesome',

  state: {
    isAwesome: true
  },

  awesomeReducer: (action, state) => {
    state.awesome.isAwesome = action.isAwesome
    return state
  }
}
