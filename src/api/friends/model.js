import mongoose from "mongoose";
import {model, Schema} from "mongoose";

const friendsSchema = new Schema({
    requester: { type: Schema.Types.ObjectId, ref: 'User'},
    recipient: { type: Schema.Types.ObjectId, ref: 'User'},
    status: {
      type: Number,
      enums: [
          0,    //'add friend',
          1,    //'requested',
          2,    //'pending',
          3,    //'friends'
      ]}
}, {
    timestamps: true
})

export default model("Friend", friendsSchema);