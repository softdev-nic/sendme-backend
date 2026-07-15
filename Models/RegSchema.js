const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
});

const RegUser= mongoose.model("User", regSchema);

module.exports = RegUser;  
