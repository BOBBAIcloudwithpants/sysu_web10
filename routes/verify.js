var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var key = require('../config/config').secret;

router.get('/', function (req, res, next) {

  var token = req.headers.token;
  jwt.verify(token, key, (err, decoded) => {
    if (!err) {
      var obj = decoded;
      res.json({
        username: obj.username,
        studentID: obj.student_id,
        phone: obj.phone,
        email: obj.email
      })
    }
    else {
      res.status(400);
      res.end();
    }
  })
})

module.exports = router;