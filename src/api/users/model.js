import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const usersSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    friends: [{type: Schema.Types.ObjectId, ref: "Friend"}],
    rooms: [{type: Schema.Types.ObjectId, ref: "Room"}]
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


usersSchema.static("checkCredentials", async function (email, password) {
    const UserModel = this;
    const user = await UserModel.findOne({email});
    if(user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch) {
            return user;
        } else {
            return null;
        }
    } else {
        return null
    }
})

usersSchema.static("checkEmail", async function (email) {
    const UserModel = this
    const user = await UserModel.findOne({email: email})
    if(user){
        return email;
    } else {
        return null
    }
})

usersSchema.static("checkUsername", async function (username) {
    const UserModel = this
    const user = await UserModel.findOne({username: username})
    if(user) {
        return username;
    } else {
        return null;
    }
})

export default model("User", usersSchema);
