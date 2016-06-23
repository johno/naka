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
      state.hello.count = action.count
      return state
    }
  },

  actions: {
    decrement: (action, state, dispatch) => dispatch('hello.reducers.setCount', { count: state.hello.count - 1 }),
    increment: (action, state, dispatch) => dispatch('hello.reducers.setCount', { count: state.hello.count + 1 })
  }
}
