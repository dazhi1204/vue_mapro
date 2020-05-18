<template>
	<div class="box">
		<Nav></Nav>
		<Map></Map>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'index',
	components: {
		// 页面组件
		Nav: () => import('./headnav/query'),
		Map: () => import('./map/map')
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
	}
};
</script>

<style lang="scss" scoped="scoped">
.box {
	height: 100vh;
	display: flex;
	flex-direction: column;
}
</style>
