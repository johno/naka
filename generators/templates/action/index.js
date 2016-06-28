module.exports = {
  name: 'awesome',

  awesomeAction: (action, state, dispatch) => {
    dispatch('awesome.reducers.awesomeReducer', {
      isAwesome: true
    })
  }
}
