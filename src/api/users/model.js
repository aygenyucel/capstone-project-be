import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const usersSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    friends: [{type: Schema.Types.ObjectId, ref: "Friend"}],
},
{timestamps: true})


usersSchema.pre("save", async function(next) {
    const currentUser = this;

    if(currentUser.isModified("password")) {
        const plainPW = currentUser.password;
        const hash = await bcrypt.hash(plainPW, 10);
        currentUser.password = hash;
    }
    next();
})


usersSchema.static("checkCredentials", async function (usernameOrEmail, password) {
    const UserModel = this;
    const user = await UserModel.findOne({usernameOrEmail});
    if(user) {
        const passwordMatdh = await bcrypt.compare(password, user.password);
        if(passwordMatdh) {
            return user;
        } else {
            return null;
        }
    } else {
        return null
    }
})


export default model("User", usersSchema);
