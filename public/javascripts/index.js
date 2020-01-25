function getCookie (c_name) {
  if (unescape(document.cookie).length > 0) {
    var c_start = unescape(document.cookie).indexOf(c_name + "=")
    var devide = unescape(document.cookie).split(";");
    for (let i = 0; i < devide.length; i++) {
      if (devide[i].indexOf(c_name + "=") != -1) {
        var temp = devide[i].split("=");
        return temp[1];
      }
    }
  }
  return ""
}

function delCookie (name) {
  if (getCookie(name)) {
    document.cookie = name + "=;" + ((expiredays == null) ? "" : ";expires=" + "Thu,01-Jan-1970 00:00:01 GMT") + ";path=\"";
  }
}
window.onload = function () {

  var token = getCookie("token");
  var username = this.getCookie("username");
  if (token != "" && window.location.pathname == "/") {
    // $.ajax(
    //   {
    //     type: "GET",
    //     url: '/?username=' + username,
    //     dataType: 'text',
    //     headers: { 'Content-type': 'apsplication/json;charset=utf8', 'token': token },
    //     success (data) {
    //       window.location.href = `/?username=` + username;
    //     },
    //     error (xhr, e, a) {
    //       data = JSON.parse(xhr)
    //       alert(data.err);
    //     }
    //   }
    // )
    window.location.href = `/?username=` + username;
  }
}