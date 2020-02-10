const passport = require("passport");
const UserModel = require("../models/users");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const JWTSECRETKEY = process.env.TRELLO_JWTSECRETKEY;

const opts = {
  // header should have `Authorization: BEARER token`
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWTSECRETKEY
};

passport.use(
  new JwtStrategy(opts, function(token_stored_payload, done) {
    const _id = mongoose.Types.ObjectId(token_stored_payload._id);
    UserModel.findOne({ _id }, function(error, user) {
      if (error) {
        return done(error, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

// https://github.com/jaredhanson/passport-local/#parameters
const localOps = { usernameField: "username" };

passport.use(
  new LocalStrategy(localOps, function(username, password, done) {
    UserModel.findOne({ username }, function(error, user) {
      if (error) return done(error, false);
      if (!user)
        return done(null, false, { message: "Invalid Username or Password" });

      user.verifyPassword(password, function(error, isEqual) {
        if (error) return done(error, false);
        if (isEqual) return done(null, user);
        return done(null, false, { message: "Invalid Username or Password" });
      });
    });
  })
);

const isUserAuthenticated = passport.authenticate("jwt", { session: false });
const localLogin = passport.authenticate("local", {
  session: false
});

module.exports = {
  isUserAuthenticated,
  localLogin
};
