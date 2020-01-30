class MemControl {
	constructor() {
		this.log = new MemLog(document.getElementById('log'))
	}

	add(item) {
		let useList = data.useList;
		let spaceList = data.spaceList;
		let status = false
		if (data.type == 1) {
			spaceList.sort(function(x, y) {
				if (x.start > y.start) {
					return 1
				} else if (x.start < y.start) {
					return -1
				} else {
					return 0
				}
			})
		} else if (data.type == 2) {
			spaceList.sort(function(x, y) {
				if (x.end - x.start > y.end - y.start) {
					return 1
				} else if (x.end - x.start < y.end - y.start) {
					return -1
				} else {
					return 0
				}
			})
		} else {
			spaceList.sort(function(x, y) {
				if (x.end - x.start < y.end - y.start) {
					return 1
				} else if (x.end - x.start > y.end - y.start) {
					return -1
				} else {
					return 0
				}
			})
		}
		for (let i = 0; i < spaceList.length; i++) {
			if (spaceList[i].end - spaceList[i].start >= item.size) {
				useList.push({
					name: item.name,
					pid: item.pid,
					start: spaceList[i].start,
					end: spaceList[i].start + item.size
				})
				if (spaceList[i].end - spaceList[i].start > item.size) {
					spaceList[i].start = spaceList[i].start + item.size;
				} else {
					spaceList = this.deleteItem(spaceList, i)
				}
				data.useList = useList;
				data.spaceList = spaceList;
				status = true
				break
			}
		}
		this.log.add(item, status ? (data.use += item.size, "<span style='color:#51f13d'>[程序启动]</span>") : "<span style='color:#f40'>[分配错误]</span>")
	}

	remove(pid) {
		let useList = data.useList;
		let item = {
			name: 'Not Find',
			pid: 'NaN',
			size: 0
		}
		let status = false
		for (let i = 0; i < useList.length; i++) {
			if (pid == useList[i].pid) {
				item = {
					name: useList[i].name,
					pid: useList[i].pid,
					size: useList[i].end - useList[i].start
				}
				this.concat(useList[i])
				useList = this.deleteItem(useList, i)
				data.useList = useList;
				status = true
				break
			}
		}
		this.log.add(item, status ? (data.use -= item.size, "<span style='color:#82bff6'>[程序退出]</span>") : "<span style='color:#f40'>[回收失败]</span>")
	}

	concat(item) {
		let spaceList = data.spaceList;
		let before = null
		let after = null
		let num = null //保存下标,准备删除
		for (let i = 0; i < spaceList.length; i++) {
			if (spaceList[i].start == item.end) {
				after = spaceList[i]
				num = i
			} else if (spaceList[i].end == item.start) {
				before = spaceList[i]

			}
		}
		//寻找合并内存前后

		if (before == null && after == null) {
			spaceList.push({
				start: item.start,
				end: item.end
			})
		} else if (before != null && after == null) {
			before.end += item.end - item.start
		} else if (before == null && after != null) {
			after.start = item.start
		} else {
			before.end = after.end
			spaceList = this.deleteItem(spaceList, num)
		}
		data.spaceList = spaceList;
		//合并内存
	}

	deleteItem(array, num) {
		delete array[num]
		array = array.filter(function(item) {
			if (item != undefined) {
				return true
			}
		})
		return array
	}

}
//内存分配算法
