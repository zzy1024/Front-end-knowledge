const tools = {
  setCookie: function(name, value, days) {
    let expires = ''
    if (days) {
      var date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toGMTString()
    } else {
      expires = ''
    }
    document.cookie = name + '=' + value + expires + '; path=/'
  },
  // 获取cookie
  getCookie: function(name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0 ;i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },
  // 删除cookie
  deleteCookie: function(name) {
    this.setCookie(name, '', -1)
  },
  ltrim: function (str) {
    return str.replace(/^\s+/, '');
  },
  rtrim: function (str) {
    return str.replace(/\s+$/, '');
  },
  trim: function (str) {
    return str.replace(/^\s*(\S*)\s*$/, '$1');
  },
  parseURL: function(url) {
    var a = document.createElement('a')
    a.href = url
    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.hostname,
      port: a.port,
      query: a.search,
      params: (function() {
        var ret = {}, seg = a.search.replace(/^\?/, '').split('&'), len = seg.length, i = 0, s
        for (; i < len; i++) {
          if (!seg[i]) { continue }
          s = seg[i].split('=')
          ret[s[0]] = s[1]
        }
        return ret
      })(),
      file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^\/])/, '/$1'),
      relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/')
    }
  },
  //检查email
  validEmail: function(email) {
    var emailRegStr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    //var emailRegStr =/^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
    var reg = new RegExp(emailRegStr);
    if (reg.test(email)) {
      return true;
    }
    return false;
  },
  //检查手机号
  validMobileFormat: function(mobile) {
    var numberRegStr = /^\d{11}$/;
    var regNum = new RegExp(numberRegStr);
    if (regNum.test(mobile)) {
      var telRegStr = /^(13|14|15|17|18)\d{9}$/;
      var reg = new RegExp(telRegStr);
      if (reg.test(mobile)) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  },
  // 同时检查手机号或email
  validMobileAndEmail:function(text){
    var regStr = /^(([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?))|((13|14|15|17|18)\d{9})$/;
    var reg = new RegExp(regStr);
    if (reg.test(text)) {
      return true;
    }
    return false;
  },
  // 检查用户名
  validUserName:function(text){
    var regStr = /^[\u4E00-\u9FA5\w\d]+$/g;
    var reg = new RegExp(regStr);
    if (reg.test(text)) {
      return true;
    }
    return false;
  },
  // 检查名字
  validName:function(text){
    var regStr = /^[a-zA-Z\u4E00-\u9FA5]+$/g;
    var reg = new RegExp(regStr);
    if (reg.test(text)) {
      return true;
    }
    return false;
  },
  // 设置className
  hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  },
  addClass(ele,cls) {
    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
  },
  removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,' ');
    }
  },
  dateFormat: function (date, format) {
    date = typeof date === 'string' ? new Date(date) : date;
    var _weekName = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var _monthName = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    var formatStr = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
      "H+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "w": '0123456'.indexOf(date.getDay()),
      "t": date.getHours() < 12 ? 'am' : 'pm',
      "W": _weekName[date.getDay()],
      "L": _monthName[date.getMonth()] //non-standard
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in formatStr) {
      if (new RegExp('(' + k + ')').test(format))
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? formatStr[k] : ('00' + formatStr[k]).substr(('' + formatStr[k]).length));
    }
    return format;
  },
  //提示信息
  showErrorTime:null,
  showError:function(msg,waitTime){
    /*var dNode=$("#dDialog");
    if (dNode.length<1) {
      dNode = $('<div id="dDialog" class="tdia"></div>');
      $("body").append(dNode);
    }
    dNode.html(msg);*/
    var oDiv = null;
    if(!document.getElementById("dDialog")){
      oDiv = document.createElement("div");
      oDiv.id = 'dDialog'
      document.body.appendChild(oDiv);
    } else {
      oDiv = document.getElementById("dDialog")
    }
    oDiv.innerHTML = '<span>' + msg + '</span>';
    /*var left = (parseFloat($(window).width())- (parseFloat(dNode.width())))/2;
    var top = ($(window).height()- dNode.height())/5*2+$(window).scrollTop();
    dNode.css({left:left,top:top});*/
    clearTimeout(tools.showErrorTime);
    tools.showErrorTime = setTimeout(function(){
      // var thisNode=oDiv.parentNode;
      oDiv.parentNode.removeChild(oDiv);
      tools.showErrorTime=null;
    },(!!waitTime?waitTime:2000));
  },
  /**
   对本地数据进行操作的相关方法，如localStorage,sessionStorage的封装
   */
  setStorage: function(key, value, duration) {
    var data = {
      value: value,
      expiryTime: !duration || isNaN(duration) ? 0 : this.getCurrentTimeStamp() + parseInt(duration)
    };
    localStorage[key] = JSON.stringify(data);
  },
  getStorage: function(key) {
    var data = localStorage[key];
    if (!data || data === "null") {
      return null;
    }
    var now = this.getCurrentTimeStamp();
    var obj;
    try {
      obj = JSON.parse(data);
    } catch (e) {
      return null;
    }
    if (obj.expiryTime === 0 || obj.expiryTime > now) {
      return obj.value;
    }
    return null;
  },
  removeStorage: function(key){
    localStorage.removeItem(key);
  },
  getSession: function(key) {
    var data = sessionStorage[key];
    if (!data || data === "null") {
      return null;
    }
    return JSON.parse(data).value;

  },
  setSession: function(key, value) {
    var data = {
      value: value
    }
    sessionStorage[key] = JSON.stringify(data);
  },
  getCurrentTimeStamp: function() {
    return Date.parse(new Date());
  },
  //获取随机颜色值
  getRandomColor: function() { 
      let rgb = [] 
      for (let i = 0; i < 3; ++i) { 
          let color = Math.floor(Math.random() * 256).toString(16) 
          color = color.length === 1 ? '0' + color : color 
          rgb.push(color) 
      } 
      return '#' + rgb.join('') 
  }
}
export default tools
