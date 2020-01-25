var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = require("../config/config").secret;
var validateFormat = require('../controller/UserController').validateFormat;
var validateDuplicated = require('../controller/UserController').validateDuplicated;
var registerUser = require('../controller/UserController').registerUser;
router.get('/', function (req, res, next) {

  res.render('regist');
});

router.post('/', async function (req, res, next) {
  var obj = req.body;

  var temp1 = await validateFormat(obj);
  var temp2 = await validateDuplicated(obj);
  if (temp1 != '') {
    res.writeHead(404);
    res.end(temp1);
  }
  else if (temp1 == '' && temp2 != '') {
    res.writeHead(404);
    res.end(temp2);
  } else {
    await registerUser(obj);
    var token = jwt.sign(obj, secret, {
      expiresIn: 60 * 5
    });
    res.json({
      success: true,
      token: token
    })

  }

})
module.exports = router;