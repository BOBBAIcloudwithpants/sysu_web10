var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var verifyUser = require('../controller/UserController').verifyUser;
var User = require('../models/user');
var secret = require('../config/config').secret;


router.get('/', function (req, res, next) {
  res.render('signin');
})

router.post('/', async function (req, res, next) {
  var obj = req.body;
  var temp = await verifyUser(obj);

  if (temp != '') {
    res.writeHead(404);
    res.end(temp);
  } else {
    User.findOne({
      username: obj.username
    }, async function (err, user) {
      if (user) {
        var token = jwt.sign(user.toJSON(), secret, {
          expiresIn: 60 * 5
        });
        res.json({
          success: true,
          token: token
        })
      }
    })
  }
})

module.exports = router;