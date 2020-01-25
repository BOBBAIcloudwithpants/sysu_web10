var jwt = require('jsonwebtoken');
var key = require('../config/config').secret;


function verify (token, obj) {
  jwt.verify(token, key, function (err, decode) {
    if (!err) {
      obj = decode;
    }
  })
}

function setCookie (c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + value +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=\"";
}

function getCookie (c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}

function delCookie (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

module.exports.setCookie = setCookie;
module.exports.getCookie = getCookie;
module.exports.delCookie = delCookie;
module.exports.verify = verify;