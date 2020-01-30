class MemList {
	constructor(all, useList, spaceList, ele) {
		this.all = all
		this.spaceList = spaceList
		this.useList = useList
		this.type = 'process'
		this.ele = ele
		this.showProcess()
	}

	updata(list, type) {
		if (type == 'process') {
			this.useList = list
			if (this.type == 'process') {
				this.showProcess()
			}
		} else {
			this.spaceList = list
			if (this.type == 'space') {
				this.showSpace()
			}
		}
	}

	updataType(type) {
		this.type = type
		this.show()
	}


	show() {
		if (this.type == 'process') {
			this.showProcess()
		} else if (this.type == 'space') {
			this.showSpace()
		}
	}

	showProcess() {
		let th =
			`<tr>
				<th>进程名</th>
				<th>PID</th>
				<th>内存起始位置</th>
				<th>内存结束位置</th>
				<th>内存使用大小</th>
				<th>内存占比</th>
				<th>结束进程</th>
			</tr>`

		let td = ""
		for (let i = 0; i < this.useList.length; i++) {
			let size = this.useList[i].end - this.useList[i].start
			td +=
				`<tr${i%2==0?"":' class="deep"'}>
					<td>${this.useList[i].name}</td>
					<td>${this.useList[i].pid}</td>
					<td>${this.useList[i].start}</td>
					<td>${this.useList[i].end}</td>
					<td>${MemMain.showSize(size)}</td>
					<td>${(size/this.all*100).toFixed(1)}%</td>
					<td style="cursor:pointer" onclick="ctroler.remove(${this.useList[i].pid})">结束</td>
				</tr>`
		}
		this.ele.innerHTML = `<table border="" cellspacing="" cellpadding="">${th}${td}</table>`
	}

	showSpace() {
		let th =
			`<tr>
				<th>空闲内存大小</th>
				<th>内存起始位置</th>
				<th>内存结束位置</th>
				<th>内存占比</th>
			</tr>`
		let td = ""
		for (let i = 0; i < this.spaceList.length; i++) {
			let size = this.spaceList[i].end - this.spaceList[i].start
			td +=
				`<tr${i%2==0?"":' class="deep"'}>
						<td>${MemMain.showSize(size)}</td>
						<td>${this.spaceList[i].start}</td>
						<td>${this.spaceList[i].end}</td>
						<td>${(size/this.all*100).toFixed(1)}%</td>
					</tr>`
		}
		this.ele.innerHTML = `<table border="" cellspacing="" cellpadding="">${th}${td}</table>`
	}
}
