import {Schema, model} from "mongoose";

const RoomsModel = new Schema({
    capacity: {type: Number, required: true},
    language: {type: String, required: true},
    level: {type: String, required: true},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    creator: {type: Schema.Types.ObjectId, ref: "User"},
    endpoint: {type: String, required: true}
},
{timestamps: true})

export default model("Room", RoomsModel);