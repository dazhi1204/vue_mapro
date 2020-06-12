<template>
	<div class="content-box">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="轨迹查询" name="first">
				<div class="box">
					<Nav></Nav>
					<Map></Map>
				</div>
			</el-tab-pane>
			<el-tab-pane label="轨迹框选" name="second">
				<div class="box">
					<Area></Area>
				</div>
				
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'index',
	components: {
		// 页面组件
		Nav: () => import('./headnav/query'),
		Map: () => import('./map/map'),
		Area: () => import('./area/area')
	},
	data() {
		return {
			activeName: 'first'
		};
	},
	computed: {
		...mapGetters(['input']),
		dataRange() {
			const { input } = this;
			return { input };
		}
	},
	watch: {
		// dataRange(val) {
		// }
		
		activeName: {
			handler(val) {
				this.$store.commit('queryModel/SET_ACTIVENAME', val);
			}
		},
	},
	methods: {
		handleClick(tab, event) {
		//	console.log(tab, event);
		}
	}
};
</script>

<style lang="scss" scoped="scoped">
.box {
	height: 100vh;
	display: flex;
	flex-direction: column;
}
.content-box{
	position: relative;
}
// /deep/.el-tabs--card>.el-tabs__header{
// 	position: absolute;
// }
</style>
