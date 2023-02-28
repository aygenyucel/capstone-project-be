import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const usersSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    friends: [{type: Schema.Types.ObjectId, ref: "Friend"}],
},
{timestamps: true})


export default model("User", usersSchema);
