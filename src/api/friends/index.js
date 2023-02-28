import express from "express";
import FriendsModel from "./model.js";

const friendsRouter = express.Router();

//post new friend
friendsRouter.post("/", async (req, res, next) => {
    try {
        const newFriend = new FriendsModel(req.body);
        const {_id} = newFriend.save();
        res.status(201).send({_id});
    } catch (error) {
        next(error)
    }
})

//get all friends
friendsRouter.get("/", async (req, res, next) => {
    try {
        const friends = new FriendsModel(req.body);
        res.send(friends);
        
    } catch (error) {
        next(error)
    }
})


export default friendsRouter;