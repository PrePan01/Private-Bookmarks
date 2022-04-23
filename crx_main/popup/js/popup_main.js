const bmUl = document.getElementsByClassName("bm-ul")[0]
const addBm = document.getElementsByClassName("addBm")[0]
let bookmarks = []
let bgjs = chrome.extension.getBackgroundPage()

// 锁定
document.getElementsByClassName("lock")[0].addEventListener("click",function (){
    bgjs.isLogin = false
    window.location.href = "../html/popup_check.html"
})

// 添加到chrome storage
function addToCsg() {
    chrome.storage.sync.set({csgBookmarks: bookmarks}, function () {

    })
}

// 获取chrome storage中bookmarks
let getBmsP = new Promise(function (res) {
    chrome.storage.sync.get(["csgBookmarks"], function (data) {
        let bmData = data.csgBookmarks
        res(bmData)
    })
})
getBmsP.then(function (data) {
    data === undefined ? '' : bookmarks = data
    updateList()
})

// 刷新页面列表
function updateList() {
    bmUl.innerHTML = ""
    // 添加书签项进列表
    for (let i in bookmarks) {
        bmUl.insertAdjacentHTML("beforeend", `
            <li class="bm-li">
                <span class="bm-li-title">${parseInt(i)+1}. ${bookmarks[i][0]}</span>
                <img class="delBm" src="../../img/del.png"/>
            </li>
        `)
    }
    toBmLink()
    delBmFn()
    isEmpty()
}

// 标题点击新建标签页
function toBmLink(){
    let bmlis = document.getElementsByClassName("bm-li-title")
    for(let i = 0;i < bmlis.length;i++){
        bmlis[i].addEventListener("click", function (){
            chrome.tabs.create({
                'url': bookmarks[i][1]
            });
        })
    }
}

// 删除指定书签
function delBmFn(){
    let delBtn = document.getElementsByClassName("delBm")
    for(let i = 0;i < delBtn.length;i++){
        delBtn[i].addEventListener("click",function (){
            bookmarks.splice(i,1)
            addToCsg()
            updateList()
        })
    }
}

// 添加到书签
addBm.addEventListener("click", function () {
    chrome.tabs.getSelected(null, function (tab) {
        let url = tab.url
        let title = prompt("请输入书签名", tab.title)
        if(title === null){
            title = tab.title
        }
        bookmarks.push([title, url])
        addToCsg()
        updateList()
    });
})

// 有无书签
function isEmpty() {
    const notice = document.getElementsByClassName("noBm")[0]
    console.log(notice)
    if (bookmarks.length === 0) {
        notice.setAttribute('style','display:block')
    } else {
        notice.setAttribute('style','display:none')
    }
}
