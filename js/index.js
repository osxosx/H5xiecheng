window.addEventListener('load', function() {
    // alert(1)轮播图效果
    var focus = this.document.querySelector('.focus');
    var ul = focus.children[0];
    // 获得宽度
    var w = focus.offsetWidth;
    var ol = focus.children[1];
    // 2. 利用定时器自动轮播图片
    var index = 0;

    var timer = setInterval(function() {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 等我们过渡结束后，再去判断，监听过渡完成的事件
    ul.addEventListener('transitionend', function() {
        if (index >= 4) {
            index = 0;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 3;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }

        // 小圆点变化
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });
    // 4.手指触摸滑动
    var startX = 0;
    var moveX = 0;
    var flag = false; //后面使用移动距离所以设置全局变量
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸的时候就停止定时器
        clearInterval(timer);
    });
    // 移动手指，计算滑动距离，移动盒子
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * w + moveX;
        // 手指拖动不需要动画效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true; //如果用户移动了，我们再去做判断效果
        e.preventDefault();
    });
    // 5.手指离开判断上一张还是原来图片
    ul.addEventListener('touchend', function(e) {
        // 距离大于50就移动下一张
        if (flag) {
            if (Math.abs(moveX) > 50) {
                // 判断正负，确定左右滑动
                if (moveX > 0) {
                    index--;
                } else {
                    index++;

                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';

            } else {
                //小于一定数值就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        //手指离开的时候重启定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);

    });
    //返回顶部的操作

    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';

        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})