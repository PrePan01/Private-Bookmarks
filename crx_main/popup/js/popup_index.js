// 判断是否第一次使用
chrome.storage.sync.get(["password"], function (data) {
    if (data.password !== undefined) {
        let bgjs = chrome.extension.getBackgroundPage()
        if(bgjs.isLogin){
            // 已登陆过
            window.location.href = "../html/popup.html"
        }else{
            // 未登录过
            window.location.href = "../html/popup_check.html"
        }
    }
    else {
        // 第一次使用，跳转注册界面
        window.location.href = "../html/popup_first.html"
    }
})
