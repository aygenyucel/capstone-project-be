import {Schema, model} from "mongoose";

const RoomsModel = new Schema({
    capacity: {type: Number, required: true},
    language: {type: String, required: true},
    level: {type: String, required: false},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
},
{timestamps: true})

export default model("Room", RoomsModel);