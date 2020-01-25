var User = require('../models/user');
var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(5);
async function findOneUser (name) {
  var user = null;
  await User.findOne({ username: name }, (err, doc) => {
    if (doc) {
      user = doc.toObject();
    }
  })

  return user;
}

var validateFormat = dict => {
  var username = dict.username
  var studentID = dict.studentID
  var phone = dict.phone
  var email = dict.email
  var password = dict.password
  var invalid = '[#%&\'/",;:=!^]'
  var include = false
  var pattern1 = new RegExp('[\u4E00-\u9FA5%]+')
  var pattern2 = new RegExp('[A-Za-z]+')
  var pattern3 = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  var pattern4 = /^(\w){6,12}$/;
  for (i = 1; i < invalid.length + 1; i++) {
    if (username.indexOf(invalid.substring(i - 1, i)) > -1) {
      include = true
      break
    }
  }
  if (
    username.length < 6 ||
    username.length > 18 ||
    pattern1.test(username) ||
    include ||
    !pattern2.test(username[0])
  ) {
    return "The user's name must have 6-18 bits of letters, numbers, or underscores, and must start with a letter."
  }
  if (studentID.length != 8 || isNaN(studentID) || studentID[0] == '0') {
    return 'The student ID must have exactly 8 digits, and has a non-zero start.'
  }
  if (phone.length != 11 || isNaN(phone) || phone[0] == '0') {
    return 'The phone number must have exactly 11 digits, and has a non-zero start.'
  }
  if (!pattern3.test(email)) {
    return 'Invalid email.'
  }
  if (!pattern4.test(password)) {
    return "The password must have 6-12 bits of letters, numbers or underscores."
  }
  return ''
}

var validateDuplicated = async (body) => {
  var flag = true;
  var mark = [0, 0, 0, 0];
  var errors = new Array;
  var temp = "";
  await User.find({ username: body.username }, (err, doc) => {
    if (doc.length > 0) {
      temp = "This username has been used.";
      flag = false;
      mark[0] = 1;
    }
  })

  await User.find({ student_id: body.studentID }, (err, doc) => {

    if (doc.length > 0) {
      flag = false;
      temp = "This studentID has been used."
      mark[1] = 1;
    }
  })

  await User.find({ phone: body.phone }, (err, doc) => {

    if (doc.length > 0) {
      flag = false;
      temp = "This phone number has been used."
      mark[2] = 1;
    }
  })

  await User.find({ email: body.email }, (err, doc) => {
    if (doc.length > 0) {
      flag = false;
      temp = "This email has been used."
      mark[3] = 1;
    }
  })
  errors.push("This username has been used.");
  errors.push("This studentID has been used.");
  errors.push("This phone number has been used.");
  errors.push("This email has been used.");
  for (let i = 0; i < 4; i++) {
    if (mark[i] == 1) {
      temp = errors[i];
      break;
    }
  }
  return temp;
}

function registerUser (obj) {
  var hash = bcrypt.hashSync(obj.password, salt);
  var user = new User({
    username: obj.username,
    student_id: obj.studentID,
    phone: obj.phone,
    email: obj.email,
    password: hash
  })

  User.create(user, (err, doc) => {
    if (err) {
      console.log("Failed to register this user.")
    }
  })

}

async function verifyUser (obj) {
  var name = obj.username;
  var password = obj.password;

  var query = null;
  await User.findOne({ username: name }, (err, doc) => {
    if (doc != null) {
      query = doc.toObject();
    }
  })

  if (query == null) {
    return "Sorry, this user doesn't exist. Please check your username.";
  }
  else {
    if (bcrypt.compareSync(password, query.password)) {
      return ""
    } else {
      return "Wrong password. Please try again.";
    }
  }

}


module.exports.validateFormat = validateFormat;
module.exports.validateDuplicated = validateDuplicated;
module.exports.findOneUser = findOneUser;
module.exports.registerUser = registerUser;
module.exports.verifyUser = verifyUser;