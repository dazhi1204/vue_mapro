<template>
	<div id="cmap">
		
	</div>
</template>

<script>
import BMap from 'BMap';
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
	name: 'Map',
	data() {
		return {
			map: null,
			mapStyle: {
				style: 'midnight'
			},
			isOpend:true,
			drawingManager:null
			
		};
	},
	computed: {
		...mapGetters(['status']),
		dataRange() {
			const { status } = this;
			return { status };
		}
	},
	watch: {
		status(val) {
			if(val == true){
				this.isOpend = true;
				this.initdrawingManager()
			}
		}
	},
	methods: {
		//创建地图
		createMap() {
			this.map = new BMap.Map('cmap');
			this.map.centerAndZoom(new BMap.Point(112.65033426887469, 26.932201308996287), 10);
			this.map.enableScrollWheelZoom(true);
			
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
				enableDrawingTool: this.isOpend, //是否显示工具栏
				drawingToolOptions: {
					anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
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
		//获取框选描述点
		overlaycomplete(e) {
			
			//多边形选区
			if (e.drawingMode == BMAP_DRAWING_POLYLINE || e.drawingMode == BMAP_DRAWING_POLYGON || e.drawingMode == BMAP_DRAWING_RECTANGLE) {
				var path = e.overlay.getPath();
				var polygonArr = new Array();
				for (var i in path) {
					polygonArr.push({
						longitude: path[i].lng,
						latitude: path[i].lat
					});
				}
				console.log(polygonArr)
			}
			//圆形选区
			if (e.drawingMode == BMAP_DRAWING_CIRCLE) {
				var Radius=  e.overlay.getRadius();
				var CenterPoint =  e.overlay.getCenter().lng + ',' + e.overlay.getCenter().lat;
				console.log("半径="+Radius)
				console.log("中心点="+CenterPoint)
			}
		}
	},
	mounted() {
		this.createMap();
	}
};
</script>

<style lang="scss" scoped>
#cmap {
	flex: auto;
	width: 100%;
}
</style>
