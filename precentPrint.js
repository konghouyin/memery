class precentPrint {
	constructor(ele,back,num) {
		this.circle = new Circle(0)
		this.canvers = new CircleCanvers(ele,back,num)
		this.timer = null
	}

	updateCircle(size) {
		clearTimeout(this.timer)
		let sizeForm = this.circle.part
		let sizeTo = size
		let step = (sizeTo - sizeForm) / 20
		this.control(step, sizeTo);
	}

	control(step, sizeTo) {
		this.timer = setTimeout(() => {
			this.circle.changePart(step)
			this.canvers.draw(this.circle)
			if (Math.abs(sizeTo - this.circle.part) > 0.0001) {
				this.control(step,sizeTo)
			}
		}, 20)

	}
}
//控制类



class Circle {
	constructor(part) {
		this.part = part //绘制圆形百分比
		this.color = ""
	}

	changePart(part) {
		this.part += part
		if (this.part < 0.5) {
			this.color = '#018c4b'
		} else if (this.part < 0.75) {
			this.color = '#ff8f0f'
		} else {
			this.color = '#ff3328'
		}
	}
}
//实体类
Circle.prototype.size = 150 //绘制圆的大小
Circle.prototype.begin = 0.8 * Math.PI //绘制圆的起始位置
Circle.prototype.end = 2.2 * Math.PI //绘制圆的结束位置




class CircleCanvers {
	constructor(ele,circleBack,num) {
		this.num = num
		this.ctx = ele.getContext("2d")
		this.ctx.lineCap = "round";
		this.ctx.lineWidth = 20;
		
		this.back = circleBack.getContext("2d")
		let r = Circle.prototype.size;
		this.back.lineCap = "round";
		this.back.lineWidth = 20;
		this.back.strokeStyle = '#ddd';
		this.back.beginPath();
		this.back.arc(r, r, r-10 , Circle.prototype.begin, Circle.prototype.end, false);
		this.back.stroke();
		//绘制背景
	}

	draw(circle) {
		this.num.innerHTML = Math.abs((100*circle.part).toFixed(1))+"%"
		let r = circle.size;
		this.ctx.clearRect(0, 0, r * 2, r * 2);
		this.ctx.strokeStyle = circle.color;
		this.ctx.beginPath();
		this.ctx.arc(r, r, r-10 , circle.begin, circle.begin + (circle.end - circle.begin) * circle.part, false);
		this.ctx.stroke();
	}
}
//实体类
