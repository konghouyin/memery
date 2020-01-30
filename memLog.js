class MemLog{
	constructor(ele) {
	    this.ele = ele
	}
	
	add(item,type){
		this.ele.innerHTML=`<div class="log-item">${type} ${item.name}(${item.pid})---Mem:${MemMain.showSize(item.size)}---${new Date()}</div>`+this.ele.innerHTML
	}
}