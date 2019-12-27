const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// describe schema using mongoose.Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String
    }
  },
  { timestamps: true }
);

// Hashing the password before saving the user
// we need function() here because we will call newUser.save()
// and this points to newUser only if we dont use
// arrow function as they ahve lexical scoping
userSchema.pre("save", async function(next) {
  try {
    const saltRounds = 4;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(this.password, salt);
    this.password = hashedPass;
    return next();
  } catch (error) {
    return next(error);
  }
});

// using callback because passport requires callback
userSchema.methods.verifyPassword = function(userEnteredPassword, callback) {
  bcrypt.compare(userEnteredPassword, this.password, function(err, isEqual) {
    if (err) return callback(err, null);
    return callback(null, isEqual);
  });
};

// descibe model class using mongoose.model
// later in db 'User' becomes plural anf all lowecase means
// our db will be names users
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
