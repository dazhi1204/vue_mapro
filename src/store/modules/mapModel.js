export default {
  namespaced: true,
  state: {
    networkType: '12'

  },
  mutations: {
    SET_ADDSTATE (state, val) {
      state.state = val
    }
  }
}
