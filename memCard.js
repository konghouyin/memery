class MemMain {
	constructor(ele, all) {
		this.ele = ele
		this.all = all
		this.precent = 0
		this.use = 0
		this.showMain()
	}

	changeMain(number){
		if(number>this.all){
			throw "内存溢出"
			return
		}
		this.use = number
		this.precent = number/this.all
		this.showMain()
	}

	showMain() {
		this.ele.innerHTML = `<div class="main">内存:(${MemMain.showPercent(this.precent)}%)</div>
					<div class="message">${MemMain.showSize(this.use)}/${MemMain.showSize(this.all)}</div>`
	}

	static showSize(num) {
		if (num < 1024) {
			return num + 'B'
		} else if (num < 1024 * 1024) {
			return (num / 1024).toFixed(1) + 'KB'
		} else if (num < 1024 * 1024 * 1024) {
			return (num / 1024 / 1024).toFixed(1) + 'MB'
		} else {
			return (num / 1024 / 1024 / 1024).toFixed(1) + 'GB'
		}
	}

	static showPercent(num) {
		return (num * 100).toFixed(1)
	}

}
