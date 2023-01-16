import keys from "./config/key";
import { User } from "./models/user";

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrkey,
};

export default (passport: any) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload: any, done: any) => {
      User.findById(jwt_payload._id).then((user: any) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
