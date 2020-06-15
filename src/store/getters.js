const getters = {
	input: state => state.queryModel.input,
	dateTime: state => state.queryModel.dateTime,
	Hour: state => state.queryModel.Hour,
	period: state => state.queryModel.period,
	activeName: state => state.queryModel.activeName,
	
	//查询条件弹窗状态
	queryStates:state => state.mapModel.queryStates,
	userStates:state => state.mapModel.userStates,
	userInfoStates:state => state.mapModel.userInfoStates,
	userLists:state => state.mapModel.userLists,
	userInfo:state => state.mapModel.userInfo,
}
export default getters
