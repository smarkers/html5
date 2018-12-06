
	//1-验证码
	function getCode(){
		var arrText=[];
		for (var i=48;i<=57 ;i++ ){
			arrText.push(String.fromCharCode(i))
		}
		for (var i=65;i<=90 ;i++ ){
			arrText.push(String.fromCharCode(i))
		}
		for (var i=97;i<=122 ;i++ ){
			arrText.push(String.fromCharCode(i))
		}
		var code=[];
		while(code.length<4){
			var x=Math.floor(Math.random()*(arrText.length-1-0+1)+0);
			if(code.indexOf(arrText[x])==-1){
				code.push(arrText[x]);
			}
		}
		return code.join("");
	}

	//arrIndexOf  数组中 某个元素的下标
	function arrIndexOf(arr,v){
		for (var i=0;i<arr.length ;i++ ){
			if(arr[i]==v){
				return i;
			}
		}
		return -1;
	}
	
	//getStyle 获取某个元素的某个css样式的值

	/*function getStyle(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	}*/


	//move 函数 元素移动一段距离的过程
	//obj：元素   attr:某个方向  speed:移动速度  end:终点  fn:移动结束后的回调函数
	function move(obj,attr,speed,end ,fn){
		clearInterval(obj.timer);
		speed=parseInt(getStyle(obj,attr))<end?speed:-speed;
		obj.timer=setInterval(function(){
			var len=parseInt(getStyle(obj,attr))+speed;
			if(len>=end&&speed>0 || len<=end&&speed<0){
				len=end;
			}
			obj.style[attr]=len+"px";
			if(len==end){
				clearInterval(obj.timer);
				fn&&fn();
			}
		},30)
	}
	//震动函数 
	function shake(obj,attr,fn){
		var arr=[];
		var index=0;
		for (var i=20;i>0 ;i-=2 ){
			arr.push(i,-i);
		}
		arr.push(0);
		var dq=parseInt(getStyle(obj,attr));  //当前样式
		obj.timer=setInterval(function(){
			obj.style[attr]=dq+arr[index++]+"px";//index++
			if(index==arr.length){
				clearInterval(obj.timer);
				fn&&fn();
			}
		},50)
	}
	//隐藏功能 函数
	function hide(obj){
		clearTimeout(obj.timer);
		obj.timer=setTimeout(function(){
			obj.style.display="none";
		},300)
		if(obj.style.display=="none"){
			clearTimeout(obj.timer);
		}
	}

	//显示功能 函数
	function show(obj){
		clearTimeout(obj.timer);
		obj.timer=setTimeout(function(){
			obj.style.display="block";
		},300)
		if(obj.style.display=="block"){
			clearTimeout(obj.timer);
		}
	}

	//getClassName  获取元素指定的className 元素的集合
	function getClassName(parent,tagName,findName){
		var aEles=parent.getElementsByTagName(tagName);
		var arr=[];
		for (var i=0;i<aEles.length ;i++ ){
			if(aEles[i].className!=""){
				var arrName=aEles[i].className.split(" ");  //获取元素className的数组集合
				for (var j=0;j<arrName.length ;j++ ){
					if(arrName[j]==findName){
						arr.push(aEles[i]);
						break;
					}
				}
			}
		}
		return arr;
	}

	//addClassName  给元素添加一个className的方法;
	function addClassName(obj,newName){
		console.log(obj);
		if(obj.className==""){
			obj.className=newName;
		}else{
			var arrName=obj.className.split(" ");
			var index=arrIndexOf(arrName,newName);
			if(index==-1){
				obj.className+=" "+newName;
			}
		}
	}

	//removeClassName 指定移出某个元素的className
	function removeClassName(obj,deletName){
		if(obj.className!=""){
			var arrName=obj.className.split(" ");
			var index=arrIndexOf(arrName,deletName);
			if(index!=-1){
				arrName.splice(index,1);  //删除 一个指定的元素（通过要删除name的下标 在arrName数组中删除）
				obj.className=arrName.join(" "); //把删除后的数组转化为字符串再重新赋值给元素
			}

		}
	}

	//运动move函数  运动框架

	function  doMove(obj,json,fn){
		clearInterval(obj.timer);
		var iCur=0;
		obj.timer=setInterval(function(){
			var onOff=true;
			for (var attr in json ){
				if(attr=="opacity"){
					iCur=Math.round(getStyle(obj,attr)*100);
				}else{
					iCur=parseInt(getStyle(obj,attr));
				}
				var speed=(json[attr]-iCur)/10;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);

					//console.log(iCur);

				if(iCur!=json[attr]){  //做完一件事后再作第二件事
					onOff=false;  
					if(attr=="opacity"){
						obj.style.opacity=(iCur+speed)/100;
						obj.style.filter="alpha(opacity="+(iCur+speed)+")";
					}else{
						obj.style[attr]=iCur+speed+"px";
					}
				}
			}
			if(onOff){  //两件是都做完了
				clearInterval(obj.timer);
				fn&&fn();  //做其他的事；
			}
		},30);
	}

	//cookie的封装
	function setCookie(name,val,t){
		var oDate=new Date(); //获取当前时间
		oDate.setDate(oDate.getDate()+t);
		document.cookie=name+"="+val+";expires="+oDate;
	}
	//如何让cookie失效（过期）	
	function removeCookie(name){
		setCookie(name,'',-1);
	}
	function getCookie(name){
		var str=document.cookie;
		var arr=str.split("; ");//["user=www","age=17",........];
		for (var i=0;i<arr.length ;i++ )
		{
			var arr1=arr[i].split("=");   //["user","www"]  ["age","17"]
			if(arr1[0]==name){
				return arr1[1];
			}
		}
	}
	//ajax的方法
	function ajax(method, url, data, success) {
		var xhr = null;
		try {
			xhr = new XMLHttpRequest();
		} catch (e) {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		
		if (method == 'get' && data) {
			url += '?' + data;
		}
		
		xhr.open(method,url,true);
		if (method == 'get') {
			xhr.send();
		} else {
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			xhr.send(data);
		}
		
		xhr.onreadystatechange = function() {
			
			if ( xhr.readyState == 4 ) {
				if ( xhr.status == 200 ) {
					success && success(xhr.responseText);
				} else {
					alert('出错了,Err：' + xhr.status);
				}
			}
			
		}
	}

	//像素

	function getxy(obj,x,y){//获取一个像素中的rgba()--->[0,0,0,255];
		var color=[]; //r g b a
		//获取指定的一个像素中的rgba()中的r
		color[0]=obj.data[4*(y*obj.width+x)+0];  
		color[1]=obj.data[4*(y*obj.width+x)+1];  
		color[2]=obj.data[4*(y*obj.width+x)+2];  
		color[3]=obj.data[4*(y*obj.width+x)+3];  
		return color;
	}

	function setxy(obj,x,y,color){ //
		obj.data[4*(y*obj.width+x)+0]=color[0];
		obj.data[4*(y*obj.width+x)+1]=color[1];  
		obj.data[4*(y*obj.width+x)+2]=color[2]; 
		obj.data[4*(y*obj.width+x)+3]=color[3]; 
	}








