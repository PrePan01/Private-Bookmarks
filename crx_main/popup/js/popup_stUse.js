// 第一次使用
// 输入密码
const stPwd = document.getElementById("st-pwd")
// 确认密码
const stPwdConfirm = document.getElementById("st-pwd-confirm")
// 确认按钮
const confirmBtn = document.getElementsByClassName("st-confirmPwd")[0]
// 密码提示词
const stPwdRemain = document.getElementById("st-pwd-remain")

confirmBtn.addEventListener("click", function () {
    const pwd = stPwd.value
    if (pwd !== stPwdConfirm.value) alert("两次输入的密码不一致")
    else {
        chrome.storage.sync.set({ stPwdRemain: stPwdRemain.value })
        chrome.storage.sync.set({ password: pwd }, function () {
            alert("设置成功！请记住密码为：" + pwd)
            
        })
    }
 })
