
 function animate(obj, target, callback) { //形参callback接收下面函数的实参function()函数，callback=function()
     clearInterval(obj.timer); //执行完成后清除定时器
     obj.timer = setInterval(function() {
         //把步长值改为整数，不要出现小数的情况
         var step = (target - obj.offsetLeft) / 10;
         step = step > 0 ? Math.ceil(step) : Math.floor(step); //前进是正值，往大取整,后退时负值，往小取整
         if (target == obj.offsetLeft) {
             clearInterval(obj.timer);
             //**回调函数的位置要写到定时器结束的位置**！！！
             if (callback) { //如果有回调函数，就执行这个回调函数
                 callback() //调用回调函数
             }
         }
         // 把1改为步长   
         obj.style.left = obj.offsetLeft + step + 'px';
     }, 15)
 }