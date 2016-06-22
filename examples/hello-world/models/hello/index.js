module.exports = {
  name: 'hello',
  state: {
    title: 'Hello, world from',
    from: 'state',
    messages: [
      'Hello, world!'
    ],
    count: 0
  },

  reducers: {
    setCount: (action, state) => {
      state.count = action
      return state
    }
  },

  actions: {
    decrement: (action, state, dispatch) => dispatch('hello:setCount', state.hello.count - 1),
    increment: (action, state, dispatch) => dispatch('hello:setCount', state.hello.count + 1)
  }
}
