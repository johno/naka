module.exports = {
  name: 'hello',

  state: {
    count: 12
  },

  setCount: (action, state) => {
    state.hello.count = action.count
    return state
  }
}
