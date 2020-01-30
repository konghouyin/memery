class MemType {
	constructor(eles) {
		this.eles = [].slice.call(eles, 0)
		this.type = 1
	}
	
	chengeType(number){
		this.type = number
		this.showType()
	}

	showType() {
		this.eles.forEach((item) => {
			item.classList.remove('active')
			item.innerHTML = "关闭"
		})
		this.eles[this.type - 1].classList.add('active')
		this.eles[this.type - 1].innerHTML = "使用"
	}
}
//内存分配方式选择



class MemAuto {
	constructor(eles) {
		this.eles = [].slice.call(eles, 0)
		this.type = 0
	}
	
	chengeType(number){
		this.type = number
		this.showType()
	}

	showType() {
		this.eles.forEach((item) => {
			item.classList.remove('active')
		})
		if(this.type==1){
			this.eles[0].classList.add('active')
		}else{
			this.eles[1].classList.add('active')
		}
	}
}
//自动运行选择

class ShowChoose {
	constructor(eles) {
		this.eles = [].slice.call(eles, 0)
		this.type = 0
	}
	
	chengeType(number){
		this.type = number
		this.showType()
	}

	showType() {
		this.eles.forEach((item) => {
			item.classList.remove('active')
		})
		if(this.type=='process'){
			this.eles[0].classList.add('active')
		}else{
			this.eles[1].classList.add('active')
		}
	}
}
//自动运行选择