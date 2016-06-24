module.exports = {
  name: 'awesome',

  state: {
    isAwesome: true
  },

  reducers: {
    awesomeReducer: (action, state) => {
      state.awesome.isAwesome = action.isAwesome
      return state
    }
  },

  actions: {
    awesomeAction: (action, state, dispatch) => {
      dispatch('awesome.reducers.awesomeReducer', {
        isAwesome: true
      })
    }
  }
}
