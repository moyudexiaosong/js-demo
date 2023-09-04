//展开侧边栏按钮
const toggle = document.getElementById('toggle');
//关闭注册框
const close = document.getElementById('close');
//打开注册框
const open = document.getElementById('open');
//注册框内容
const modal = document.getElementById('modal');
//侧边栏内容
const navbar = document.getElementById('navbar');

//如果检测到侧边栏显示，并且点击的目标不是切换按钮、切换按钮的子元素、侧边栏内容、侧边栏内容的子元素
//则关闭侧边栏，并且移除监听事件，相当于不对这次点击事件做出任何回应
//如果检测到侧边栏不显示，也移除监听事件
const closeNavbar = (e) => {
    if (
        document.body.classList.contains('show-nav') &&
        e.target !== toggle &&
        !toggle.contains(e.target) &&
        e.target !== navbar &&
        !navbar.contains(e.target)
    ) {
        document.body.classList.toggle('show-nav')
        document.body.removeEventListener('click', closeNavbar)
    } else if (!document.body.classList.contains('show-nav')) {
        document.body.removeEventListener('click', closeNavbar)
    }
}

toggle.addEventListener('click', () => {
    document.body.classList.toggle('show-nav')
    document.body.addEventListener('click', closeNavbar)
})

open.addEventListener('click', () => {
    modal.classList.add('show-modal')
})
close.addEventListener('click', () => {
    modal.classList.remove('show-modal')
})

window.addEventListener('click', e =>
    e.target == modal ? modal.classList.remove('show-modal') : false
)