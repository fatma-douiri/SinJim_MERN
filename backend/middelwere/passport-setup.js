const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const passport = require("passport");

require("dotenv").config({ path: "./config/.env" });
const secretOrKey = process.env.secretOrKey;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const { id } = jwt_payload;

    try {
      const authUser = await User.findById(id);

      console.log(authUser);

      authUser ? done(null, authUser) : done(null, false);
      
      
    } catch (error) {
      console.log("Passport Error :", error);
    }
  })
);

module.exports = isAuth = () => passport.authenticate("jwt", { session: false });