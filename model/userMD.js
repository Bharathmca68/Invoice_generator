const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    UserName: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    Password: {
      type: String,
      required: true,
      trime: true,
      minLength: 6,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password must not contain password");
        }
      },
    },
    Role: {
      type: String,
      required: true,
    },
    // LastActive: {
    //   created: { type: Date, default: Date.now },
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema, "User");
