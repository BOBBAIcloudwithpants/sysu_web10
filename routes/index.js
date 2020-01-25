var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var key = require('../config/config').secret;

/* GET home page. */
router.get('/', function (req, res, next) {

  var query = req.query;
  if (query)
    query = req.query.username;
  if (typeof (query) == 'undefined') { // 是否有参数
    res.render('index.ejs');
  } else {
    // await findOneUser(query).then((v) => { obj = v; })
    // if (obj == null) {
    //   res.render('index.ejs');
    // }
    res.render('userInformation.ejs', {
      username: query,
      studentID: undefined,
      email: undefined,
      phone: undefined
    })
  }
})


module.exports = router;
