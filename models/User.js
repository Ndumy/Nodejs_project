const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 1,
    validate: {
      validator: validator.isEmail,
      message: "{Value} is not a valid email",
    },
  },
  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    unique: true,
    required: true,
  },

  dob: {
    type: Date,
    required: true,
  },

  createdat: {
    type: Date,
  },
  modifiedat: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(err);
      }
      resolve(true);
    });
  });
};
mongoose.model("User", userSchema);
