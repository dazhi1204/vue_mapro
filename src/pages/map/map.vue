<template>
	<div id="map"></div>
</template>

<script>
import BMap from 'BMap';
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
			hotDate: [
				{ lng: '114.363979', lat: '36.03773', count: '52' },
				{ lng: '114.295894', lat: '36.231772', count: '7' },
				{ lng: '114.504007', lat: '36.093311', count: '6' },
				{ lng: '114.395983', lat: '36.201385', count: '19' },
				{ lng: '114.718751', lat: '36.091966', count: '2' },
				{ lng: '114.48261', lat: '36.146032', count: '4' },
				{ lng: '114.037656', lat: '36.276956', count: '1' },
				{ lng: '114.425989', lat: '36.157907', count: '5' },
				{ lng: '114.309662', lat: '36.19489', count: '8' },
				{ lng: '114.008762', lat: '36.162515', count: '11' },
				{ lng: '114.149597', lat: '36.25203', count: '11' },
				{ lng: '114.634489', lat: '36.09711', count: '3' },
				{ lng: '114.035667', lat: '36.042826', count: '5' },
				{ lng: '114.220135', lat: '36.116061', count: '38' },
				{ lng: '114.137829', lat: '36.054525', count: '7' },
				{ lng: '114.137348', lat: '36.136101', count: '55' },
				{ lng: '114.078537', lat: '36.235848', count: '28' },
				{ lng: '114.648979', lat: '36.043749', count: '1' },
				{ lng: '114.104776', lat: '36.124067', count: '12' },
				{ lng: '114.578275', lat: '36.095941', count: '3' },
				{ lng: '114.578275', lat: '36.095941', count: '22' },
				{ lng: '114.578275', lat: '36.095941', count: '4' },
				{ lng: '113.913152', lat: '36.000907', count: '5' },
				{ lng: '113.831853', lat: '35.836377', count: '4' },
				{ lng: '113.825641', lat: '36.072186', count: '16' },
				{ lng: '113.931695', lat: '36.262638', count: '9' },
				{ lng: '113.965077', lat: '35.919748', count: '6' },
				{ lng: '113.830067', lat: '35.932444', count: '1' },
				{ lng: '113.830067', lat: '35.932444', count: '7' },
				{ lng: '113.750022', lat: '35.976316', count: '10' },
				{ lng: '113.934346', lat: '36.166723', count: '6' },
				{ lng: '113.928979', lat: '36.059528', count: '14' },
				{ lng: '113.898287', lat: '35.777936', count: '6' },
				{ lng: '113.867283', lat: '36.134905', count: '29' },
				{ lng: '113.81997', lat: '36.280506', count: '6' },
				{ lng: '113.936795', lat: '35.768474', count: '3' },
				{ lng: '113.818245', lat: '36.183143', count: '107' },
				{ lng: '113.762547', lat: '35.916163', count: '12' },
				{ lng: '113.762547', lat: '35.916163', count: '17' },
				{ lng: '114.309528', lat: '36.098035', count: '12' },
				{ lng: '114.184941', lat: '36.066066', count: '10' },
				{ lng: '114.265651', lat: '36.016851', count: '10' },
				{ lng: '114.794527', lat: '35.889239', count: '4' },
				{ lng: '114.916588', lat: '35.953233', count: '33' },
				{ lng: '114.862802', lat: '36.082315', count: '5' },
				{ lng: '114.821994', lat: '35.940167', count: '7' },
				{ lng: '114.732801', lat: '36.010095', count: '1' },
				{ lng: '114.665014', lat: '35.827956', count: '5' },
				{ lng: '114.687001', lat: '35.926633', count: '4' },
				{ lng: '114.886604', lat: '35.823869', count: '17' },
				{ lng: '114.714493', lat: '35.824384', count: '9' },
				{ lng: '114.838951', lat: '35.714762', count: '8' },
				{ lng: '114.768614', lat: '35.820543', count: '3' },
				{ lng: '114.945903', lat: '36.001222', count: '10' },
				{ lng: '114.814282', lat: '36.05379', count: '1' },
				{ lng: '114.89458', lat: '36.128534', count: '2' },
				{ lng: '114.768884', lat: '36.09376', count: '3' },
				{ lng: '114.891728', lat: '35.996425', count: '9' },
				{ lng: '114.899498', lat: '35.683682', count: '2' },
				{ lng: '114.436397', lat: '35.942211', count: '13' },
				{ lng: '114.537118', lat: '35.959195', count: '5' },
				{ lng: '114.374189', lat: '35.92115', count: '21' },
				{ lng: '114.435536', lat: '35.884432', count: '1' },
				{ lng: '114.434839', lat: '35.885617', count: '23' },
				{ lng: '114.468909', lat: '35.952258', count: '17' },
				{ lng: '114.358104', lat: '35.944822', count: '27' },
				{ lng: '114.647021', lat: '35.968271', count: '6' },
				{ lng: '114.483172', lat: '35.862866', count: '3' },
				{ lng: '114.589631', lat: '35.856694', count: '4' },
				{ lng: '114.37365', lat: '35.930392', count: '1' },
				{ lng: '114.322755', lat: '35.82315', count: '26' },
				{ lng: '114.322755', lat: '35.82315', count: '6' },
				{ lng: '114.376392', lat: '36.013433', count: '3' },
				{ lng: '114.447681', lat: '36.052479', count: '6' },
				{ lng: '114.447681', lat: '36.052479', count: '13' },
				{ lng: '114.31517', lat: '36.117569', count: '5' }
			],
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
		...mapGetters(['input', 'dateTime', 'Hour', 'period']),
		dataRange() {
			const { input, dateTime, Hour, period } = this;
			return { input, dateTime, Hour, period };
		}
	},
	watch: {
		dataRange(val) {
			
		}
	},
	methods: {
		//创建地图
		createMap() {
			this.map = new BMap.Map('map');
			this.map.centerAndZoom(new BMap.Point(112.65033426887469, 26.932201308996287), 10);
			this.map.enableScrollWheelZoom(true);
		},
		//热力图
		getHeatmap() {
			this.heatmapOverlay = new BMapLib.HeatmapOverlay({ radius: 40 });
			this.map.addOverlay(this.heatmapOverlay);
			this.heatmapOverlay.setDataSet({ data: this.hotDate, max: 100 });
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
						//设置自定义overlay的位置
						me._setInfoWin(pos);
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
				enableRotation: true, //是否设置marker随着道路的走向进行旋转
				
			});
			this.lushu.start();
		}
	},
	mounted() {
		this.createMap();
		//优先加载地图
		setTimeout(() => {
			this.getHeatmap();
		}, 200);
		setTimeout(() => {
			this.getPath();
		}, 200);
	}
};
</script>

<style lang="scss" scoped>
#map {
	flex: auto;
	width: 100%;
}
</style>
