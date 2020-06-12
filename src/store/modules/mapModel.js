export default {
  namespaced: true,
  state: {
    queryStates: false,
	userStates:false,
	userLists:[]

  },
  mutations: {
    SET_QUERY(state, val) {
    	state.queryStates = val
    },
	SET_USER(state, val) {
		state.userStates = val
	},
	SET_USERLIST(state, val) {
		state.userLists = val
	},
  }
}
