import express, { json } from "express";
import cors from "cors";
import createHttpError from "http-errors";
import { badRequestErrorHandler, conflictErrorHandler, forbiddenErrorHandler, genericErrorHandler, notFoundErrorHandler, unauthorizedErrorHandler } from "./errorHandlers.js";
import mongoose from 'mongoose';
import listEndpoints from "express-list-endpoints";
import usersRouter from './api/users/index.js';
import friendsRouter from "./api/friends/index.js";

const server = express();
const port = process.env.PORT;

//************************ MIDDLEWARES *********************/
server.use(express.json());

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];

server.use(cors({
    origin: (origin, corsNext) => {
        if(!origin || whitelist.indexOf(origin) !== -1) {
            corsNext(null, true)
        } else {
            corsNext(createHttpError(400, `Cors Error! Your origin ${origin} is not in the list!`))
        }
    }
}))


//************************* ENDPOINTS **********************/

server.use("/users", usersRouter)
server.use("/friends", friendsRouter)


//*********************** ERROR HANDLERS *******************/

server.use(forbiddenErrorHandler)
server.use(conflictErrorHandler)
server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(unauthorizedErrorHandler)
server.use(genericErrorHandler)

//**********************************************************/

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_CONNECTION_URL)


mongoose.connection.on("connected", () => {
    
    server.listen(port, () => {
        console.table(listEndpoints(server));
        console.log("Server is running on port:", port)
    })
})