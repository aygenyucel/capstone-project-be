import express from "express";
import UsersModel from "./model.js"
import { passport } from 'passport';

const usersRouter = express.Router();

//post a new user
usersRouter.post("/", async(req, res, next) => {
    try {
        const newUser = new UsersModel(req.body);
        const {_id} = await newUser.save();

        res.status(201).send({_id})
    } catch (error) {
        next(error)
    }
})

//get all users
usersRouter.get("/", async(req, res, next) => {
    try{
        
        const users = await UsersModel.find({});
        res.send(users);
    } catch(error) {
        next(error)
    }
})

//anonymous authentication
// usersRouter.post("/anonymous", passport.authenticate("anonymous", {session: false}), async(req, res, next) => {})

export default usersRouter;