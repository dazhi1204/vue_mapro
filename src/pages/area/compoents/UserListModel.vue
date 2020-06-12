<template>
	<div class="list">
		<div class="title">
			<span>框选内轨迹用户列表</span>
			<i class="el-icon-circle-close  close" @click="close"></i>
		</div>
		<div class="content">
			<div class="content_list" v-for="(item, i) in userLists">
				<li>{{ item.date }}</li>
				<li>{{ item.name }}</li>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			
		};
	},
	computed: {
		...mapGetters(['userLists'])
	},
	watch: {},
	mounted() {},
	methods: {
		close() {
			this.$store.commit('mapModel/SET_USER', false);
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
.list {
	padding: 5px;
	width: 200px;
	position: absolute;
	border: 1px solid #d4dbe1;
	background-color: #ffffff;
	top: 0;
	right: 0;
}
li {
	list-style: none;
}
.title {
	border-bottom: 1px solid #d4dbe1;
	padding: 5px;
	span {
		display: inline-block;
		text-align: left;
		font-size: 12px;
	}
	.close {
		float: right;
		cursor: pointer;
	}
}
.content {
	max-height: 300px;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	border: 1px solid #d4dbe1;
}
.content_list {
	display: flex;
	flex-direction: row;
	text-align: center;
	justify-content: space-between;
}
.content_list li {
	width: 100%;
	padding: 5px;
	white-space: nowrap;
	border-right: 1px solid #d4dbe1;
	border-bottom: 1px solid #d4dbe1;
}
.content_list li:nth-child(2) {
	border-right: none;
}
::-webkit-scrollbar-track-piece {
	//滚动条凹槽的颜色，还可以设置边框属性
	background-color: rgb(1, 4, 60);
	margin-right: 2px;
}
::-webkit-scrollbar {
	//滚动条的宽度
	width: 6px;
	height: 6px;
}
::-webkit-scrollbar-thumb {
	//滚动条的设置
	background-color: #999999;
	border-radius: 0px;
	background-clip: padding-box;
	min-height: 20px;
}
::-webkit-scrollbar-thumb:hover {
	background-color: #bbb;
}
</style>
