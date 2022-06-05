window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focusWidth = focus.offsetWidth; //必须写到全局，

    //鼠标经过轮播图，显示按钮
    focus.addEventListener('mouseenter', function() {
            arrow_l.style.display = 'block';
            arrow_r.style.display = 'block';
            //停止定时器  停止播放轮播图
            clearInterval(timer);
            timer = null; //清除这个定时器
        })
        //鼠标离开轮播图，隐藏按钮
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            timer = setInterval(function() {
                arrow_r.click();
            }, 2000)

        })
        //动态生成悬浮导航条
    var ol = document.querySelector('.circle');
    var ul = document.querySelector('.play');
    for (var i = 0; i < ul.children.length; i++) {
        //创建节点
        var li = document.createElement('li');
        //记录当前小圆圈的索引号  通过自定义属性来做
        li.setAttribute('index', i)
            //添加节点
        ol.appendChild(li);
        //排他思想
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';

            // 点击导航条滚动图片
            var index = this.getAttribute('index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index; //之前先声明一个全局变量num和circle
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle
            circle = num;
            // animate(obj, target, callback) 
            animate(ul, -index * focusWidth); //使用动画函数的前提，该元素必须有定位!!!1
        })


    }
    //把ol的第一个li类名设为current
    ol.children[0].className = 'current';
    var num = 0;
    var circle = 0
        //克隆第一张图片 true深克隆 flase浅克隆
    var first = ul.children[0].cloneNode(true);
    //添加到ul中
    ul.appendChild(first);
    //节流阀
    var flag = true;
    // 右侧按钮
    arrow_r.addEventListener('click', function() {
            if (flag) {
                flag = false; //关闭节流阀
                //如果滚动到最后一张图片，
                if (num == ul.children.length - 1) {
                    //让ul 快速的、不做动画的跳到最左侧: left 为0
                    ul.style.left = 0;
                    // 同时num赋值为0，可以从新开始滚动图片 
                    num = 0;
                }
                // 点击一次， 自增1，让这个变量乘以图片宽度，就是ul的滚动距离。
                num++;
                animate(ul, -num * focusWidth, function() { //function（）在回调函数里开启节流阀，动画结束后再执行（开启）
                    flag = true;
                });
                //  点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
                circle++;
                // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
                if (circle == ol.children.length) {
                    circle = 0;
                }
                circleChange();
            }


        })
        //左侧按钮
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1; //
                // -(children.length-1)*foucsWidth,
                ul.style.left = -num * focusWidth + 'px'; //因为是跳到最后一张图，所以为负值
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = children.length - 1;
            }
            circleChange()
        }
    })

    function circleChange() {
        // 排他思想
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';

    }
    //自动播放轮播图  定时器
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 4000)
})