window.onload = function () {

    // 导航显示、隐藏
    var navBtn = document.querySelector(".nav_btn");
    var wap = document.querySelector(".wapContainer");
    var close = document.querySelector(".nav_close")
    navBtn.addEventListener('click', function () {
        wap.style.display = "block";
    })
    close.addEventListener('click', function () {
        wap.style.display = "none";
    })   
}
