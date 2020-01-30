let data = {
	all: 1024 * 1024 * 1056.89,
	type: 1,
	use: 0,
	spaceList: [{
		start: 0,
		end: 1024 * 1024 * 1056.89
	}],
	useList: [],
	auto: 0,
	showType: 'process',
	pid: 1
}


let components = {
	circle: new precentPrint(document.getElementById('circle'), document.getElementById('circleBack'),
		document.getElementsByClassName('num')[0]),
	precent: new tablePrint(document.getElementById('line'), document.getElementById('lineBack')),
	typeChoose: new MemType(document.getElementsByClassName('btn')),
	mem: new MemMain(document.getElementById('mem-main'), data.all),
	memShow: new MemShow(data.all, data.useList, document.getElementById('mem-show')),
	memList: new MemList(data.all, data.useList, data.spaceList, document.getElementById('table-show')),
	auto: new MemAuto(document.getElementsByClassName('tbtn')),
	showChoose: new ShowChoose(document.getElementsByClassName('stbtn'))
}

let ctroler = new MemControl()
let timer = null;


Object.defineProperty(data, 'all', {
	writable: false
})

let type = data.type
Object.defineProperty(data, 'type', {
	get: function() {
		return type
	},
	set: function(val) {
		if (val == 1 || val == 2 || val == 3) {
			components.typeChoose.chengeType(val)
			type = val
		} else {
			throw "typeError"
		}
	}
})

let use = data.use
Object.defineProperty(data, 'use', {
	get: function() {
		return use
	},
	set: function(val) {
		use = val
		components.circle.updateCircle(val / data.all)
		components.mem.changeMain(val)
		components.precent.updateSize(val / data.all)
	}
})

let auto = data.auto
Object.defineProperty(data, 'auto', {
	get: function() {
		return auto
	},
	set: function(val) {
		auto = val
		if (val == 1 || val == 0) {
			components.auto.chengeType(val)
			if (val == 1) {
				timer = setInterval(function() {
					ctroler.add({
						name: 'pid-' + data.pid,
						pid: data.pid++,
						size: Math.floor(Math.random() * 1024 * 1024 * 50)
					})
					//每两秒创建一个进程

					if (data.use / data.all > 0.78) {
						let num = parseInt(Math.random() * 5)
						for (let i = 0; i < num; i++) {
							ctroler.remove(data.useList[parseInt(Math.random() * (data.useList.length))].pid)
						}
					}
					//内存占用大于75%时,自动回收0-3个进程
				}, 100)
			} else {
				clearInterval(timer)
			}
			auto = val
		} else {
			throw "autoError"
		}
	}
})

let showType = data.showType
Object.defineProperty(data, 'showType', {
	get: function() {
		return showType
	},
	set: function(val) {
		showType = val
		if (val == 'process' || val == 'space') {
			components.memList.updataType(val)
			components.showChoose.chengeType(val)
			showType = val
		} else {
			throw "listShowError"
		}
	}
})




let useList = data.useList
Object.defineProperty(data, 'useList', {
	get: function() {
		return useList
	},
	set: function(val) {
		useList = val
		components.memShow.updata(val)
		components.memList.updata(val, 'process')
	}
})

let spaceList = data.spaceList
Object.defineProperty(data, 'spaceList', {
	get: function() {
		return spaceList
	},
	set: function(val) {
		spaceList = val
		components.memList.updata(val, 'space')
	}
})
