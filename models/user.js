const mongoosee = require('../config/mongoose.js');
const mongoose = require("mongoose");
const db = mongoosee();
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, max: 100 },
    student_id: { type: String, required: true, max: 100 },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  }
);

module.exports = db.model("user", UserSchema);

