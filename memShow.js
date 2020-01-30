class MemShow {
	constructor(all, list, ele) {
		this.list = list
		this.step = 850 / all
		this.ele = ele
	}

	updata(list) {
		this.list = list
		this.show()
	}

	show() {
		let Domstring = '';
		let style = '';
		for (let i = 0; i < this.list.length; i++) {
			let pid = this.list[i].pid
			let size = this.list[i].end - this.list[i].start
			let width = (size) * this.step
			let Domleft = this.list[i].start * this.step

			let mainLeft = 0
			if (Domleft + width / 2 + 15 > 850) {
				mainLeft = 'right:-15px'
			} else if (Domleft + width / 2 + 65 > 850) {
				mainLeft = 'right:' + (-(850 - Domleft - width / 2)) + 'px'
				//偏右部分
			} else if (Domleft + width / 2 < 15) {
				mainLeft = 'left:-15px'
				//最左部分
			} else if (Domleft + width / 2 < 65) {
				mainLeft = 'left:' + (-(Domleft)) + 'px'
				//偏左部分
			} else {
				mainLeft = 'left:' + (-(65 - width / 2)) + 'px'
				//中间部分ok
			}
			let firstLeft = (width / 2 - 5)

			Domstring += '<div class="card pid' + pid + '" style="width:' +
				width + 'px;left:' + Domleft + 'px"></div>'
			style += '#mem-show>.pid' + pid + '::after{content:"pid:' + pid + '/' + MemMain.showSize(size) + '";' +
				mainLeft + '}' +
				'#mem-show>.pid' + pid + '::before{left:' + firstLeft + 'px}'
		}


		this.ele.innerHTML = Domstring + '<style>' + style + '</style>';
	}
}
