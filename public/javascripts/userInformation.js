function delCookie (name) {
  document.cookie = name + "=;" + ";expires=" + "Thu,01-Jan-1970 00:00:01 GMT" + ";path=\"";
}


window.onload = () => {
  $("#resignin").click(function () {
    delCookie("token");
    delCookie("username");
    window.location.href = `/signin`;
  })

  $("#register").click(function () {
    delCookie("token");
    window.location.href = `/regist`;
  })
}
