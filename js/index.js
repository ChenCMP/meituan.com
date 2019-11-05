
	//获取dom元素
	var bannerBox=document.querySelector(".slider");
	var bul=document.querySelector(".slider-item");
	var list=document.querySelectorAll(".slider-item li");
	var points=document.querySelectorAll(".slider-pagination li")
	var pre=document.querySelector(".pre");
	var next=document.querySelector(".next");
	//console.log(points)
	//索引值
	var index=0;
	var width=bannerBox.offsetWidth;
	//console.log(list.length);
	//图片向左移动
	var timer = setInterval(changImg,1000);
	function changImg(){
		if(index>=list.length-1){
			index=0;
			bul.style.left=-index*width+"px"
		}
		index++;
		/* console.log(index); */
		animationMove(bul,-index*width);
		changPoint();
	}
	//指示条跟随图片移动
	function changPoint(){
		for(var i=0;i<points.length;i++){
			if(i==index){
				points[index].classList.add("active")
			}else{
				points[i].classList.remove("active")
			}
			if(index==list.length-1){
				points[0].classList.add("active")
			}
		}
	}
	
		// 点击指示点 实现指示点变化 图片相应的变化
		for (var k = 0; k < points.length; k++) {
			points[k].num = k // 自定义一个属性 绑定对应的k
			points[k].onclick = function() {
				// console.log(this.num)
				index = this.num
				// console.log(index)
				bul.style.left = -index * width +"px"
				changPoint()
			}
		}

		//点击左边按钮
		pre.onclick = function(){
			changImg()
		}
		//点击右边按钮
		next.onclick = function(){
			
			if(index <= 0) {
				index = list.length-1
				bul.style.left = -index * width +"px"
			}
			index--
			// console.log(index)
			// bul.style.left = -index * width +"px"
			animationMove(bul, -index * width)
			changPoint()
		}

		// 鼠标悬停事件  定时器清除 
		bannerBox.onmouseover = function() {
			clearInterval(timer)  
			pre.style.display = "block"
			next.style.display = "block"
		}
		
		//鼠标离开 定时器重新启动
		bannerBox.onmouseout = function() {
			clearInterval(timer)
			timer = setInterval(changImg,2000)
			pre.style.display = "none"
			next.style.display = "none"
		}

		// 封装缓动函数
		function animationMove(obj, target) {  // 参数一：需要缓动的对象  参数二：需要达到目标
			var currentLeft = obj.offsetLeft; // 当前的dom对象的left值
			obj.timeId = setInterval(function(){
				
				// console.log(currentLeft)
				// 当前的left值比目标值大  左边
				var isLeft = currentLeft > target ? true : false
				// console.log(isLeft)
				if(isLeft){  // isLeft 为true 则是向左走 currentLeft需要不断相减
					currentLeft -=10
				}else{
					currentLeft +=10 // isLeft 为false 则是向右走 currentLeft需要不断相加
				}

				if(isLeft? currentLeft > target:currentLeft < target){
					//当isLeft是true时 执行currentLeft > target语句 ，这时currentLeft > target是成立的 ，所以返回true
					//当isLeft是false时 执行currentLeft < target语句，这时currentLeft < target也是成立的 ， 所以也是返回true 
					obj.style.left = currentLeft + "px"
				}else{  // 当currentLeft既不大于target也不小于target的时候，则停止定时器 ，且obj当前的left值应当等于目标值
					clearInterval(obj.timeId)
					obj.style.left = target + "px"
				}


			},10)

		}
