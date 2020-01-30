class tablePrint {
	constructor(ele, back, num) {
		this.now = 0
		this.list = new ListPoint()
		this.canvers = new ListCanvers(ele, back)
		this.control()
	}

	updateSize(size) {
		this.now = size
	}

	control() {
		setInterval(() => {
			this.list.add(this.now)
			this.canvers.draw(this.list.list)
		}, 1000)
	}
}
//控制类



class ListPoint {
	constructor(part) {
		this.list = []
		for (let i = 0; i < 61; i++) {
			this.list.push(0)
		}
	}

	add(part) {
		this.list.shift();
		this.list.push(part)
	}
}



class ListCanvers {
	constructor(ele, circleBack) {
		this.ctx = ele.getContext("2d")
		this.ctx.strokeStyle = '#82bff6'
		this.ctx.fillStyle = "rgba(88,178,220,0.15)";
		this.ctx.lineWidth = 2;

		this.back = circleBack.getContext("2d")
		this.back.lineWidth = 1;
		this.back.strokeStyle = '#d8d8d8';
		this.back.beginPath();
		for(let i=30;i<300;i+=30){
			this.back.moveTo(i,0)
			this.back.lineTo(i,150)
		}
		for(let i = 15;i<150;i+=15){
			this.back.moveTo(0,i)
			this.back.lineTo(300,i)
		}
		this.back.stroke();
		//绘制背景
	}

	draw(list) {
		this.ctx.clearRect(0, 0, 300, 150);
		this.ctx.beginPath()
		this.ctx.lineTo(-1, 0);
		this.ctx.lineTo(-1, list[0] * 150);
		for (let each = 1; each < list.length; each++) {
			this.ctx.lineTo(each * 5, list[each] * 150)
		}
		this.ctx.lineTo(301, list[list.length-1] * 150);
		this.ctx.lineTo(301, 0);
		this.ctx.stroke();
		this.ctx.fill();
	}
}
//实体类
