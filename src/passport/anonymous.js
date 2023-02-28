import { Strategy as AnonymousStrategy } from "passport-anonymous";
import UserModel from "../api/users/model.js"
import passport from "passport";

export default (passport) => {
    passport.use(
        new AnonymousStrategy()
    )
}