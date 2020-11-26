window.addEventListener('load', function() {
    // 放大镜
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    //黄色模块
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preview_img.addEventListener('mousemove', function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        var bigImg = document.querySelector('.bigImg');
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })

    //tab栏
    var detail_lists = document.querySelectorAll('.detail_lists');
    var detail_cons = document.querySelectorAll('.detail_tab_con');
    for(var i = 0; i < detail_lists.length; i++) {
        //给detail_tab_con添加自定义属性
        detail_lists[i].setAttribute('data-index-detail', i);
        detail_lists[i].addEventListener('mouseenter', function() {
            //排他思想，当鼠标经过某个li，全部li背景颜色变为空,div全部隐藏
            for(var i = 0; i < detail_lists.length; i++) {
                detail_lists[i].className = '';
                detail_cons[i].style.display = 'none';
            }
            //改变当前li的背景颜色，并显示对应的div
            this.className = 'current';
            var index = this.getAttribute('data-index-detail');
            detail_cons[index].style.display = 'block';
        })
    }

})