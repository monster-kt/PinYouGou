window.addEventListener('load', function () {
    //轮播图
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    var num = 0;
    //定义一个变量，用来控制小圆圈
    var circle = 0;
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 清除定时器，取消自动播放
        clearInterval(timer);
        //清空定时器变量
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //启动计时器
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000)
    })
    // 动态生成小圆圈
    var ol = document.querySelector('.circle');
    var ul = focus.querySelector('ul');    // 几个li几个圆圈
    for (let i = 0; i < ul.children.length; i++) {
        const li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆圈 移动图片
            var index = this.getAttribute('index');
            //当我们点击小圆圈时，要把索引值给num和circle
            num = circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    // ol里第一个li类名设置为current
    ol.children[0].className = 'current';

    // 图片无缝滚动
    //克隆第一张图片到ul后面 true 深克隆 复制里面的子节点
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //定义一个flag，节流阀,使点击图片一张结束才能点击下一张
    var flag = true;
    // 点击右侧按钮 图片滚动一张
    arrow_r.addEventListener('click', function() {
        if(flag) {
            flag = false;
            if(num == ul.children.length - 1) {
                num = 0;
                ul.style.left = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle++;
            circle = circle === ol.children.length ? 0 : circle;
            currentChange();
        }   
    })
    //左按钮点击事件
    arrow_l.addEventListener('click', function() {
        if(flag) {
            flag = false;
            if(num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            circle = circle < 0 ? ol.children.length -1 : circle;
            currentChange();
        }
        
    })
    // 封装更改类名函数
    function currentChange() {
        for(let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //自动播放事件
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000)

    // 固定电梯导航 鼠标移动更换背景颜色
    var lis = document.querySelector('.fixedtool').querySelectorAll('li');
    for (var i = 0; i < lis.length; i++){
        lis[i].onmousemove = function () {
            this.className = 'current';
        }
        lis[i].onmouseout = function () {
            this.className = '';
        }
    }
    // 购物车鼠标事件
    var shopcar = document.querySelector('.shopcar');
    shopcar.addEventListener('mouseover', function () {
        this.style.cursor = 'pointer';
    })
})