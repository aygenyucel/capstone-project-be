import express from "express";
import RoomsModel from "./model.js"
import createHttpError from 'http-errors';

const roomsRouter = express.Router()

//create a new room
roomsRouter.post("/", async (req, res, next) => {
    try {
        const newRoom = new RoomsModel(req.body);
        const {_id} = await newRoom.save();
        res.status(201).send(newRoom)
    } catch (error) {
        next(error)
    }
})

//get all rooms
roomsRouter.get("/", async (req, res, next) => {
    try {
        const rooms = await RoomsModel.find();
        res.send(rooms)
        
    } catch (error) {
        next(error)
    }
})

//get a room with id
roomsRouter.get("/:roomID", async (req, res, next) => {
    try {
        const room = await RoomsModel.findById(req.params.roomID);

        if(room){
            res.send(room)
        }else {
            next(createHttpError(404, `The room with id ${req.params.roomID} not found!`))
        }
        
    } catch (error) {
        next(error)
    }
})

//edit a room with id
roomsRouter.put("/:roomID", async (req, res, next) => {
    try {
        console.log("howwwwwwww")
        const updatedRoom = await RoomsModel.findByIdAndUpdate(req.params.roomID, {...req.body}, {runValidators: true, new: true})

        if(updatedRoom) {
            res.send(updatedRoom)
        } else {
            next(createHttpError(404, `The room with id ${req.params.roomID} not found!`))
        }

    } catch (error) {
        next(error)
    }
})

//delete a room with id
roomsRouter.delete("/:roomID", async (req, res, next) => {
    try {
        const deletedRoom = await RoomsModel.findByIdAndDelete(req.params.roomID);
        if(deletedRoom) {
            res.status(204).send();
        } else {
            next(createHttpError(404, `The room with id ${req.params.roomID} not found!`))
        }
    } catch (error) {
        next(error)
    }
})

//add new user to room
roomsRouter.put("/:roomID/newUser", async (req, res, next) => {
})

export default roomsRouter;