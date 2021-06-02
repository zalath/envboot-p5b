import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      starterLineLeft: 0
    }
  },
  mutations: {
    setStLL(state, val) {
      state.starterLineLeft = val
    }
  },
  actions: {
  },
  modules: {
  }
})
