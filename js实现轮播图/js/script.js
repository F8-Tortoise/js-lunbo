// 声明全局变量
var index = 0, //当前显示图片的索引，默认值为0
    timer = null, //用来放定时器
    main = byId('main'),
    prev = byId('prev'),
    next = byId('next'),
    pics = byId('banner').getElementsByTagName("div"),
    dots = byId('dots').getElementsByTagName("span"),
    banner = byId('banner'),
    menuContent = byId('menu-content'),
    menuItems = menuContent.getElementsByClassName("menu-item"),
    subMenu = byId('submenu'),
    innerBox = subMenu.getElementsByClassName('inner-box'),
    size = pics.length;



// 封装getElementById()
function byId(id) {
    return typeof(id) === "string" ? document.getElementById(id) : id;
}

/*
    封装通用时间绑定方法
    element绑定事件的DOM元素
    事件名
    事件处理程序
*/
function addHandler(element, type, handler) {
    // 非IE浏览器
    if (element.addEventListener) {
        element.addEventListener(type, handler, true);
    } else if (element.attachEvent) {
        // IE浏览器支持DOM2级
        element.attachEvent("on" + type, handler);
    } else {
        // IE浏览器不支持DOM2级
        element["on" + type] = handler;
    }
}

// 清除定时器，停止自动轮播
function stopAutoPlay() {
    if (timer) {
        clearInterval(timer)
    }
}


// 自动播放
function startAutoPlay() {
    timer = setInterval(function() {
        index++;
        if (index >= size) index = 0;
        changeImg();
    }, 3000)
}

// 切换图片
function changeImg() {
    // 遍历所有图片,将图片隐藏，将圆点上的类清除
    for (let i = 0; i < size; i++) {
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    pics[index].style.display = "block";
    dots[index].className = "active";
}

// 点击下一张按钮去显示下一张图片
addHandler(next, "click", function() {
    index++;
    if (index >= size) index = 0;
    changeImg();
})

// 点击上一张按钮去显示上一张图片
addHandler(prev, "click", function() {
    index--;
    if (index < 0) index = size - 1;
    changeImg();
})

// 点击按钮切换图片
for (var d = 0; d < size; d++) {
    // 设置属性值（'属性名称','属性的值'）
    dots[d].setAttribute("data-id", d);
    addHandler(dots[d], 'click', function() {
        index = this.getAttribute('data-id');
        changeImg();
    })
}

// 鼠标滑过主菜单
for (var m = 0, idx; m < menuItems.length; m++) {
    // 给所有主菜单定义属性，表明它的索引
    menuItems[m].setAttribute("data-index", m)
    addHandler(menuItems[m], 'mouseover', function() {
        // 显示子菜单所在的背景
        subMenu.className = 'sub-menu';
        // 获取当前主菜单的索引
        idx = this.getAttribute("data-index");
        // 遍历所有的子菜单innerBox，将他们隐藏
        for (var j = 0; j < innerBox.length; j++) {
            // 隐藏所有的子菜单
            innerBox[j].style.display = "none";
            menuItems[j].style.background = "none";
        }
        // 找到当前子菜单，让其显示出来
        innerBox[idx].style.display = "block";
        menuItems[idx].style.background = "rgba(0,0,0,0.5)";
    })
}

// 鼠标离开主菜单menuContent，隐藏子菜单
addHandler(menuContent, 'mouseout', function() {
    subMenu.className = 'sub-menu hide'
})

// 鼠标划入子菜单submenu，显示子菜单
addHandler(submenu, 'mouseover', function() {
    this.className = 'sub-menu'
})

// 鼠标离开子菜单submenu，隐藏子菜单
addHandler(submenu, 'mouseout', function() {
    this.className = 'sub-menu hide'
})

// 鼠标滑入main，停止轮播
addHandler(main, 'mouseover', stopAutoPlay)

// 鼠标离开main，开始轮播
addHandler(main, 'mouseout', startAutoPlay)

startAutoPlay()