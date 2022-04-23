// 弹窗样式
window.alert = alert;
function alert(data, callback) {
    var alert_bg = document.createElement('div');
    alert_box = document.createElement('div'),
    alert_text = document.createElement('div'),
    alert_btn = document.createElement('div'),
    textNode = document.createTextNode(data ? data : ''),
    btnText = document.createTextNode('确 定');

    // 遮罩
    css(alert_bg, {
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'background-color': 'rgb(0, 0, 0, 0.1)',
        'z-index': '999999999'
    });

    // 弹窗
    css(alert_box, {
        'width': '150px',
        'max-width': '90%',
        'font-size': '16px',
        'text-align': 'center',
        'background-color': '#fff',
        'border-radius': '10px',
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)'
    });

    // 文字
    css(alert_text, {
        'padding': '10px 15px',
        'border-bottom': '1px solid #ddd',
        'color': 'rgb(208,164,143)'
    });

    // 按钮
    css(alert_btn, {
        'padding': '4px 0',
        'color': 'rgb(242,173,173)',
        'font-weight': '200',
        'cursor': 'pointer'
    });

    // 内部结构套入
    alert_text.appendChild(textNode);
    alert_btn.appendChild(btnText);
    alert_box.appendChild(alert_text);
    alert_box.appendChild(alert_btn);
    alert_bg.appendChild(alert_box);

    // 整体显示到页面内
    document.getElementsByTagName('body')[0].appendChild(alert_bg);

    // 确定绑定点击事件删除标签
    alert_btn.onclick = function() {
        alert_bg.parentNode.removeChild(alert_bg);
        if (typeof callback === 'function') {
            callback(); //回调
        }
    }
}

function css(targetObj, cssObj) {
    var str = targetObj.getAttribute("style") ? targetObj.getAttribute('style') : '';
    for (var i in cssObj) {
        str += i + ':' + cssObj[i] + ';';
    }
    targetObj.style.cssText = str;
}