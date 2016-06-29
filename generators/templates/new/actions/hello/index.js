module.exports = {
  name: 'hello',

  decrement: (action, state, dispatch) => {
    dispatch('hello.reducers.setCount', {
      count: state.hello.count - 1
    })
  },

  increment: (action, state, dispatch) => {
    dispatch('hello.reducers.setCount', {
      count: state.hello.count + 1
    })
  }
}
