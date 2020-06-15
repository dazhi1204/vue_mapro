export default {
	namespaced: true,
	state: {
		queryStates: false,
		userStates: false,
		userInfoStates:false,
		userLists: [],
		userInfo:''

	},
	mutations: {
		SET_QUERYSTATE(state, val) {
			state.queryStates = val
		},
		SET_USERSTATE(state, val) {
			state.userStates = val
		},
		SET_USERINFOSTATE(state, val) {
			state.userInfoStates = val
		},
		SET_USERLIST(state, val) {
			state.userLists = val
		},
		SET_USERINFO(state, val) {
			state.userInfo = val
		},
	}
}
