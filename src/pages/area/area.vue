<template>
	<div class="box">
		<div id="cmap"></div>
		<el-button class="reserve" type="primary" @click="ClearAll()">重置</el-button>
		<query v-if="queryState"></query>
		<user v-if="userState && userList.length > 0"></user>
		<userInfo v-if="userInfoState"></userInfo>
	</div>
</template>

<script>
import BMap from 'BMap';
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
	name: 'Map',
	components: {
		// 页面组件
		query: () => import('../area/compoents/QueryModel'),
		user: () => import('../area/compoents/UserListModel'),
		userInfo: () => import('../area/compoents/UserInfoMedel')
	},
	data() {
		return {
			map: null,
			mapStyle: {
				style: 'midnight'
			},
			isOpend: true,
			drawingManager: null,
			queryState: false,
			userState: false,
			userInfoState: false,
			userList: []
		};
	},
	computed: {
		...mapGetters(['activeName', 'queryStates', 'userStates', 'userLists', 'userInfoStates'])
	},
	watch: {
		activeName(val) {
			this.createMap();
		},
		//框选查询选项弹窗状态(用于点击关闭弹窗)
		queryState: {
			handler(val) {
				this.$store.commit('mapModel/SET_QUERYSTATE', val);
			}
		},
		//监听store值有变化时改变
		queryStates(val) {
			this.queryState = val;
		},
		userStates(val) {
			this.userState = val;
		},
		userLists(val) {
			this.userList = val;
		},
		userInfoStates(val) {
			this.userInfoState = val;
		}
	},
	methods: {
		//创建地图
		createMap() {
			this.map = new BMap.Map('cmap');
			//this.map.centerAndZoom(new BMap.Point(106.472739, 29.561524), 10);
			this.map.centerAndZoom('武汉', 10);
			this.map.enableScrollWheelZoom(true);
			this.initdrawingManager();
		},
		//重置
		ClearAll() {
			this.map.clearOverlays();
			this.$store.commit('mapModel/SET_USERSTATE', false);
			this.$store.commit('mapModel/SET_QUERYSTATE', false);
			this.$store.commit('mapModel/SET_USERINFOSTATE', false);
		},
		//查询数据
		Query(points) {
			console.log(points);
			var url = '/static/wuhan-car';
			this.$http
				.get(url)
				.then(rs => {
					var data = [];
					var timeData = [];

					rs = rs.data.split('\n');
					var maxLength = 0;
					for (var i = 0; i < rs.length; i++) {
						var item = rs[i].split(',');
						var coordinates = [];
						if (item.length > maxLength) {
							maxLength = item.length;
						}
						for (var j = 0; j < item.length; j += 2) {
							coordinates.push([item[j], item[j + 1]]);
							timeData.push({
								geometry: {
									type: 'Point',
									coordinates: [item[j], item[j + 1]]
								},
								count: 1,
								time: j
							});
						}
						data.push({
							geometry: {
								type: 'LineString',
								coordinates: coordinates,
								id: j,
								username: 'User' + j
							}
						});
					}

					var dataSet = new mapv.DataSet(data);

					var options = {
						strokeStyle: 'rgba(0, 0, 255, 0.5)',
						coordType: 'bd09mc',
						globalCompositeOperation: 'lighter',
						shadowColor: 'rgba(0, 0, 255, 0.2)',
						shadowBlur: 3,
						lineWidth: 3.0,
						draw: 'simple',
						methods: {
							click: function(item) {
								console.log(item);
							}
						}
					};

					var mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options);

					var dataSet = new mapv.DataSet(timeData);

					var options = {
						fillStyle: 'rgba(255, 255, 0, 0.2)',
						coordType: 'bd09mc',
						globalCompositeOperation: 'lighter',
						size: 1.5,
						animation: {
							stepsRange: {
								start: 0,
								end: 100
							},
							trails: 3,
							duration: 5
						},
						draw: 'simple'
					};

					var mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options);
				})
				.catch(err => {
					this.$message({
						type: 'warning',
						message: '失败'
					});
				});
		},

		initdrawingManager() {
			var styleOptions = {
				strokeColor: 'red', //边线颜色。
				fillColor: '', //填充颜色。当参数为空时，圆形将没有填充效果。
				strokeWeight: 1, //边线的宽度，以像素为单位。
				strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
				fillOpacity: 0.1, //填充的透明度，取值范围0 - 1。
				strokeStyle: 'solid' //边线的样式，solid或dashed。
			};
			//实例化鼠标绘制工具
			this.drawingManager = new BMapLib.DrawingManager(this.map, {
				isOpen: false, //是否开启绘制模式
				enableDrawingTool: true, //是否显示工具栏
				drawingToolOptions: {
					anchor: BMAP_ANCHOR_TOP_LEFT, //位置
					offset: new BMap.Size(0, 0), //偏离值
					drawingModes: [
						// 可见的操作选项
						//BMAP_DRAWING_MARKER,
						BMAP_DRAWING_CIRCLE,
						//BMAP_DRAWING_POLYLINE,
						BMAP_DRAWING_POLYGON,
						BMAP_DRAWING_RECTANGLE
					]
				},
				circleOptions: styleOptions, //圆的样式
				//polylineOptions: styleOptions, //线的样式
				polygonOptions: styleOptions, //多边形的样式
				rectangleOptions: styleOptions //矩形的样式
			});
			this.drawingManager.addEventListener('overlaycomplete', this.overlaycomplete);
		},
		//

		//获取框选描述点
		overlaycomplete(e) {
			//多边形选区
			if (e.drawingMode == BMAP_DRAWING_POLYLINE || e.drawingMode == BMAP_DRAWING_POLYGON || e.drawingMode == BMAP_DRAWING_RECTANGLE) {
				var path = e.overlay.getPath();
				var polygonArr = new Array();
				var arr = [];
				for (var i in path) {
					polygonArr.push({
						longitude: path[i].lng,
						latitude: path[i].lat
					});
				}

				this.drawingManager.close();
				this.queryState = true;
				this.Query(polygonArr);
			}
			//圆形选区
			if (e.drawingMode == BMAP_DRAWING_CIRCLE) {
				var Radius = e.overlay.getRadius();
				var CenterPoint = e.overlay.getCenter().lng + ',' + e.overlay.getCenter().lat;
				//console.log('半径=' + Radius);
				//console.log('中心点=' + CenterPoint);
				var point = {
					radius: Radius,
					center: CenterPoint
				};

				console.log(Math.PI * Radius * Radius);

				this.drawingManager.close();
				this.queryState = true;
				this.Query(point);
			}
		}
	},
	mounted() {
		this.createMap();
	}
};
</script>

<style lang="scss" scoped>
.box {
	height: 100vh;
}
#cmap {
	flex: auto;
	width: 100%;
}
.reserve {
	position: absolute;
	left: 260px;
}
</style>
