class inputCtroler {
	constructor(input, btn) {
		this.input = input
		this.btn = btn
		document.getElementsByClassName('submit')[0].addEventListener('click', () => {
			let input1 = document.getElementById('submitName')
			let input2 = document.getElementById('submitSize')
			
			let name = input1.value==""?'pid-' + data.pid:input1.value
			let reg = /\d+(M|K|G){0,1}(B)*$/
			if(!reg.test(input2.value)){
				input2.style.border="1px solid #f40"
				return 
			}
			let type = 1;
			if(input2.value.indexOf('M')!=-1){
				type=1024*1024
			}else if(input2.value.indexOf('K')!=-1){
				type=1024
			}
			else if(input2.value.indexOf('G')!=-1){
				type=1024*1024*1024
			}
			let size = input2.value.split(/(M|K|G)/)[0]
			ctroler.add({
				name: name,
				pid: data.pid++,
				size: parseInt(parseFloat(size)*type)
			})
			this.input.style.display = 'none';
		})
		document.getElementsByClassName('cancle')[0].addEventListener('click', () => {
			this.input.style.display = 'none';
			document.getElementById('submitSize').style.border=""
		})
		this.input.addEventListener('click', (e) => {e.stopPropagation();},false)
		this.btn.addEventListener('click', (e) => {
			this.input.style.display = 'block';
			document.body.addEventListener('click', () => {
				this.input.style.display = 'none';
				document.getElementById('submitSize').style.border=""
			}, {
				once: true,
				capture: false
			})
			e.stopPropagation();
		},false)
	}
}

let input = new inputCtroler(document.getElementsByClassName('input')[0], document.getElementsByClassName('add')[0])


