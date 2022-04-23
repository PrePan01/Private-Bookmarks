chrome.storage.sync.get(["password"], function (data) {
    const leftImg = document.getElementsByClassName("leftImg")[0]
    leftImg.src = "../../img/1.png"

    // 已保存密码
    const pwd = data.password

    const confirm = document.getElementsByClassName("confirm")[0]
    const password = document.getElementsByClassName("password")[0]
    const forget = document.getElementsByClassName("forget")[0]

    // 密码输入框获取焦点时
    password.addEventListener("focus", function () {
        leftImg.src = "../../img/2.png"  
    })

    // 密码输入框失去焦点时
    password.addEventListener("blur", function () {
        leftImg.src = "../../img/1.png"  
    })
    
    confirm.addEventListener("click", function () {
        if (password.value === pwd) {
            window.location.href = "popup.html"
            let bgjs = chrome.extension.getBackgroundPage()
            bgjs.isLogin = true
        } else {
            alert("密码错误！")
        }
    })

    forget.addEventListener("click",function (){
        chrome.storage.sync.get([ "stPwdRemain" ],function (data){
            alert(`密码提示词：${data.stPwdRemain}`)
        })
    })

})
