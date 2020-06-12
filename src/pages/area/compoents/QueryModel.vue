<template>
	<div class="content-box">
		<div class="title">
			<span class="title_span">查询选项</span>
			<i class="el-icon-circle-close  close" @click="close"></i>
		</div>
		<div class="content">
			<div>
				<span class="date">日期:</span>
				<el-date-picker
					v-model="date"
					:editable="false"
					value-format="yyyy-MM-dd"
					align="left"
					type="date"
					placeholder="选择日期"
					:picker-options="pickerOptions"
					@change="changeTime"
				></el-date-picker>
			</div>
			<div>
				<span>开始时间:</span>
				<el-time-select
					placeholder="起始时间"
					v-model="startTime"
					:picker-options="{
						start: '00:00',
						step: '00:01',
						end: '23:59'
					}"
				></el-time-select>
			</div>
			<div>
				<span>结束时间:</span>
				<el-time-select
					placeholder="结束时间"
					v-model="endTime"
					:picker-options="{
						start: '00:00',
						step: '00:01',
						end: '23:59'
					}"
				></el-time-select>
			</div>
		</div>
		<div class="btn">
			<el-button type="success" plain @click="query">查询</el-button>
			<el-button type="success" plain>取消</el-button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				},
				shortcuts: [
					{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					},
					{
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					},
					{
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}
				]
			},
			date: '',
			startTime: '',
			endTime: '',
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎'
				},
				{
					date: '2016-05-04',
					name: '王小虎'
				},
				{
					date: '2016-05-01',
					name: '王小虎'
				},
				{
					date: '2016-05-03',
					name: '王小虎'
				},
				{
					date: '2016-05-04',
					name: '王小虎'
				},
				{
					date: '2016-05-01',
					name: '王小虎'
				}	
			]
		};
	},
	computed: {
		...mapGetters(['queryStates'])
	},
	watch: {},
	mounted() {},
	methods: {
		changeTime() {
			console.log(this.date);
		},
		close() {
			this.$store.commit('mapModel/SET_QUERY', false);
		},
		query() {
			this.$store.commit('mapModel/SET_USER', true);
			this.$store.commit('mapModel/SET_QUERY', false);
			this.$store.commit('mapModel/SET_USERLIST', this.tableData);
		}
	}
};
</script>

<style scoped="scoped" lang="scss">
.content-box {
	position: absolute;
	border: 1px solid #d4dbe1;
	background-color: #ffffff;
	top: 0;
	right: 0;
}
.title {
	border-bottom: 1px solid #d4dbe1;
	padding: 5px;
	.title_span {
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
	padding: 5px;
}
.content div {
	margin-top: 10px;
	span {
		font-size: 12px;
		margin-right: 5px;
	}
	.date {
		margin-right: 30px;
	}
}
.btn {
	text-align: center;
	.el-button {
		margin: 10px 40px;
	}
}
</style>
