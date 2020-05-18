<template>
	<div class="nav">
		<div class="nav_left">
			<span style="margin-right: 10px;">IMEI:</span>
			<div class="imei"><el-input v-model="input" placeholder="请输入内容"></el-input></div>
			<span style="margin:0 10px;">选择日期:</span>
			<div class="left_data">
				<el-date-picker v-model="dateTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
				<el-select v-model="Hour" placeholder="请选择">
					<el-option v-for="item in HourList" :key="item.value" :label="item.label" :value="item.label"></el-option>
				</el-select>
			</div>
			<el-button style="margin-left: 10px;" type="primary">热力图数据查询</el-button>
		</div>
		<div class="nav_right">
			<el-date-picker v-model="period" type="daterange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
			<el-button style="margin-left: 10px;" type="primary">轨迹图数据查询</el-button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			input: '',//IMEI
			dateTime: '',//热力图查询日期
			Hour: '',//热力图查询小时
			HourList: [],//小时数组
			period: ''//轨迹数据查询时间区间
		};
	},
	watch: {
		input: {
			handler(val) {
				this.$store.commit('queryModel/SET_INPUT', val);
			}
		},
		dateTime: {
			handler(val) {
				this.$store.commit('queryModel/SET_DATETIME', val);
			}
		},
		Hour: {
			handler(val) {
				this.$store.commit('queryModel/SET_HOUR', val);
			}
		},
		period: {
			handler(val) {
				this.$store.commit('queryModel/SET_PERIOD', val);
			}
		}
	},
	mounted() {
		this.Time();
	},
	methods: {
		Time() {
			this.HourList = [];
			for (let i = 0; i < 24; i++) {
				this.HourList.push({
					value: i,
					label: this.add_10(i) + ':00:00'
				});
			}
		},
		add_10(num) {
			if (num < 10) {
				num = '0' + num;
			}
			return num;
		}
	}
};
</script>

<style lang="scss" scoped>
.nav {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	line-height: 28px;
	div {
		display: flex;
	}
}
.nav_left {
	flex-direction: row;
	justify-content: space-between;
	width: 50%;
	.imei {
		width: 20%;
		span {
			display: inline-flex;
		}
	}
	.left_data {
		width: 32%;
		.el-input {
			width: 50%;
		}
		.el-select {
			width: 50%;
		}
	}
}
.nav_right {
	width: 50%;
}

//element样式修改
/deep/#reser > div:nth-child(1) > .el-input__suffix {
	display: none;
}
.el-select-dropdown__item {
	text-align: center;
}
</style>
