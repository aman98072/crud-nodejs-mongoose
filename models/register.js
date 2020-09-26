var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true
    },   
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    }, 
    password: {
        type: String,
        required: true,       
    }             
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminUser", userSchema);
