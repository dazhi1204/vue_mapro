<template>
	<div id="map"></div>
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
			heatmapOverlay: '',
			hotDate: [],
			LinePath: [
				new BMap.Point(112.65033426887469, 26.932201308996287),
				new BMap.Point(112.64616613130976, 26.929560168523434),
				new BMap.Point(112.64228545150795, 26.92743432712639),
				new BMap.Point(112.63941087387695, 26.925759393261522),
				new BMap.Point(112.63639256736442, 26.923375790192576),
				new BMap.Point(112.63380544749654, 26.921765218762054),
				new BMap.Point(112.63136205651021, 26.920605592943105),
				new BMap.Point(112.62863120776079, 26.919381530398923),
				new BMap.Point(112.6266190034191, 26.91731992103974),
				new BMap.Point(112.62424747687353, 26.917996390807122),
				new BMap.Point(112.62245086585418, 26.917480985641845),
				new BMap.Point(112.62033086485133, 26.91712664321053),
				new BMap.Point(112.61867798271352, 26.917931965291583),
				new BMap.Point(112.61693527002468, 26.91905936042684),
				new BMap.Point(112.61477933680145, 26.91918821011957),
				new BMap.Point(112.61046747035498, 26.918415109732468),
				new BMap.Point(112.60780848604632, 26.918543960168762),
				new BMap.Point(112.6047901795338, 26.92137863214264),
				new BMap.Point(112.60148441525817, 26.923118054307793),
				new BMap.Point(112.59767559989712, 26.922602672788333),
				new BMap.Point(112.59372305565452, 26.92279594113699),
				new BMap.Point(112.58854881591876, 26.923794488940775),
				new BMap.Point(112.57841592976955, 26.930139890406817),
				new BMap.Point(112.57184033343869, 26.93358622629276),
				new BMap.Point(112.56612711039712, 26.93555091219322),
				new BMap.Point(112.56073727733903, 26.934616885505708),
				new BMap.Point(112.55739558084301, 26.932297888887586),
				new BMap.Point(112.556281682011, 26.929044770736855),
				new BMap.Point(112.55894066631967, 26.923375744175143),
				new BMap.Point(112.55840168301386, 26.920283426503516),
				new BMap.Point(112.55408981656738, 26.91625684281818),
				new BMap.Point(112.55175422224221, 26.910973744778918),
				new BMap.Point(112.55181710362788, 26.902388131399693),
				new BMap.Point(112.55842863217913, 26.8956867422899),
				new BMap.Point(112.5672679583944, 26.889693813579093),
				new BMap.Point(112.57847881115522, 26.885053906157644),
				new BMap.Point(112.58933034171217, 26.882540542566332),
				new BMap.Point(112.60370322986707, 26.88163829570166),
				new BMap.Point(112.61764493137731, 26.881509402698125),
				new BMap.Point(112.6281371397304, 26.883120554563508),
				new BMap.Point(112.62892764857891, 26.883088331753715),
				new BMap.Point(112.62932290300317, 26.88260498849237),
				new BMap.Point(112.63007747963131, 26.88192830441639),
				new BMap.Point(112.63151476844679, 26.880897158902417),
				new BMap.Point(112.63309578614383, 26.879930451347448),
				new BMap.Point(112.63708426260682, 26.87786811396665),
				new BMap.Point(112.64175545125715, 26.875902413251843),
				new BMap.Point(112.64657036878906, 26.874838986989463),
				new BMap.Point(112.64973240418313, 26.87267987832466),
				new BMap.Point(112.65091816745591, 26.870617407249977),
				new BMap.Point(112.65210393072869, 26.8693605702934),
				new BMap.Point(112.65411613507037, 26.868877167704348),
				new BMap.Point(112.65648766161593, 26.868651579114676),
				new BMap.Point(112.66004495143427, 26.868168173462305),
				new BMap.Point(112.66611749667972, 26.867426947405495),
				new BMap.Point(112.6709324142116, 26.86568665823492),
				new BMap.Point(112.67330394075717, 26.862141541016463),
				new BMap.Point(112.67416631404646, 26.858080632391804),
				new BMap.Point(112.6740225851649, 26.853117099547216),
				new BMap.Point(112.67272902523096, 26.844156398667668),
				new BMap.Point(112.67186665194167, 26.827135539679343),
				new BMap.Point(112.67057309200773, 26.81759241203979),
				new BMap.Point(112.66453647898267, 26.81269157137199),
				new BMap.Point(112.64714528431524, 26.815399957164153),
				new BMap.Point(112.6255859520829, 26.81630273789266),
				new BMap.Point(112.60761984188927, 26.810885944506687),
				new BMap.Point(112.59870865123324, 26.799793598948863),
				new BMap.Point(112.59252830932662, 26.781475930726824),
				new BMap.Point(112.60805102853392, 26.769348506471623),
				new BMap.Point(112.63162256510796, 26.757993986725698),
				new BMap.Point(112.65720630602368, 26.75438094444486),
				new BMap.Point(112.67157919417858, 26.75876819496492),
				new BMap.Point(112.6827900469394, 26.7657358291653),
				new BMap.Point(112.68997649101685, 26.762123035719306),
				new BMap.Point(112.69457581522641, 26.743541121008164),
				new BMap.Point(112.68681445562277, 26.727537567670183)
			],
			lushu: {},
			speed: 4000
		};
	},
	computed: {
		...mapGetters(['input', 'dateTime', 'Hour', 'period', 'activeName']),
		dataRange() {
			const { input, dateTime, Hour, period, activeName } = this;
			return { input, dateTime, Hour, period, activeName };
		}
	},
	watch: {
		dataRange(val) {},
		activeName(val) {
			this.createMap();
		}
	},
	methods: {
		//创建地图
		createMap() {
			this.map = new BMap.Map('map');
			this.map.centerAndZoom(new BMap.Point(112.65033426887469, 26.932201308996287), 10);
			this.map.enableScrollWheelZoom(true);
			//优先加载地图
			setTimeout(() => {
				this.getHeatmap();
			}, 200);
			setTimeout(() => {
				this.getPath();
			}, 200);
		},
		//热力图
		getHeatmap() {
			var url = '/static/hotData.json';
			this.$http
				.get(url)
				.then(res => {
					this.hotDate = res.body.result.data;
					this.heatmapOverlay = new BMapLib.HeatmapOverlay({ radius: 40 });
					this.map.addOverlay(this.heatmapOverlay);
					this.heatmapOverlay.setDataSet({ data: this.hotDate, max: 100 });
				})
				.catch(err => {
					this.$message({
						type: 'warning',
						message: '失败'
					});
				});
		},
		//轨迹点
		setMark() {
			var myIcon = new BMap.Icon(require('@/assets/img/track.png'), new BMap.Size(15, 15), {
				offset: new BMap.Size(-15, 7)
			});
			this.LinePath.forEach(item => {
				var marker = new BMap.Marker(item, {
					icon: myIcon
				});
				this.map.addOverlay(marker);
			});
		},
		//轨迹移动
		getPath() {
			//this.setMark();
			this.map.addOverlay(new BMap.Polyline(this.LinePath, { strokeColor: '#aa0000' }));
			this.map.setViewport(this.LinePath);
			BMapLib.LuShu.prototype._move = function(initPos, targetPos, effect) {
				var pointsArr = [initPos, targetPos];
				var me = this,
					currentCount = 0, //当前的帧数
					timer = 10, //米/秒
					step = this._opts.speed / (1000 / timer), //步长
					start = this._projection.lngLatToPoint(initPos), //初始坐标
					end = this._projection.lngLatToPoint(targetPos), //获取结束点的(x,y)坐标
					count = Math.round(me._getDistance(start, end) / step); //总的步长

				//显示小车走过的痕迹
				this._map.addOverlay(
					new BMap.Polyline(pointsArr, {
						strokeColor: '#00ff00',
						strokeWeight: 5,
						strokeOpacity: 0.5
					})
				);
				me._intervalFlag = setInterval(function() {
					//当前帧数大于总帧数的时候，则说明已经完成移动
					if (currentCount >= count) {
						clearInterval(me._intervalFlag);
						if (me.i > me._path.length) {
							return;
						}
						//运行下一个点
						me._moveNext(++me.i);
					} else {
						currentCount++;
						var x = effect(start.x, end.x, currentCount, count),
							y = effect(start.y, end.y, currentCount, count),
							pos = me._projection.pointToLngLat(new BMap.Pixel(x, y));
						if (currentCount == 1) {
							var proPos = null;
							if (me.i - 1 >= 0) {
								proPos = me._path[me.i - 1];
							}
							if (me._opts.enableRotation == true) {
								me.setRotation(proPos, initPos, targetPos);
							}
							if (me._opts.autoView) {
								if (!me._map.getBounds().containsPoint(pos)) {
									me._map.setCenter(pos);
								}
							}
						}
						//正在移动
						me._marker.setPosition(pos);
					}
				}, timer);
			};
			this.initLushu(this.map, this.LinePath);
		},
		//百度路书
		initLushu(map, arrPois) {
			this.lushu = new BMapLib.LuShu(map, arrPois, {
				defaultContent: '', //"从天安门到百度大厦"
				autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
				icon: new BMap.Icon(require('@/assets/img/car.png'), new BMap.Size(52, 26), {
					anchor: new BMap.Size(27, 13)
				}),
				speed: this.speed,
				enableRotation: true //是否设置marker随着道路的走向进行旋转
			});
			this.lushu.start();
		}
	},
	mounted() {
		this.createMap();
	}
};
</script>

<style lang="scss" scoped>
#map {
	flex: auto;
	width: 100%;
}
</style>
