const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const gravatar = require("gravatar");
const { User } = require("../db/userModel");
const { createToken } = require("../helpers/apiHelpers");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/users/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;
    const user = await User.findOne({ email });

    if (user) {
      return done(null, user);
    }

    const password = await bcrypt.hash(uuidv4(), 10);
    const avatarURL = gravatar.url(
      email,
      { s: "250", r: "x", d: "robohash" },
      true
    );
    const newUser = await User.create({
      email,
      password,
      name: displayName,
      city: "City",
      phone: "null" + "_" + Math.floor(Math.random() * 10000000),
      avatarURL,
    });
    const token = await createToken(newUser);
    newUser.token = token;

    await newUser.save();

    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);
passport.use("google", googleStrategy);

module.exports = passport;
