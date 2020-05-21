<template>
	<div>
		<el-button style="margin-left: 10px;" type="primary" @click = "DrawShow()">框选</el-button>
	</div>
</template>

<script>

export default {
	data() {
		return {
			status:false
		};
	},
	watch: {
		status: {
			handler(val) {
				this.$store.commit('queryModel/SET_STATUS', val);
			}
		},
	},
	mounted() {
		
	},
	methods: {
		DrawShow(){
			this.status = true
		}
	}
};
</script>

<style>
</style>
