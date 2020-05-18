export default {
	namespaced: true,
	state: {
		input: '',
		dateTime: '',
		Hour: '',
		period: ''

	},
	mutations: {
		SET_INPUT(state, val) {
			state.input = val
		},
		SET_DATETIME(state, val) {
			state.dateTime = val
		},
		SET_HOUR(state, val) {
			state.Hour = val
		},
		SET_HOUR(state, val) {
			state.Hour = val
		},
		SET_PERIOD(state, val) {
			state.period = val
		}
	}
}
