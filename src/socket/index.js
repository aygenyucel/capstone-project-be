
import  dotenv  from 'dotenv';
import { disconnect } from 'mongoose';
import { io } from './../server.js';

dotenv.config();

let roomID = ''
let peerID = ''
let currentPeerID = ''
let users = []
let roomEndpoint = ''

export const newConnectionHandler = socket => {
    
    const socketID = socket.id;
    
    console.log("New connection:", socketID)
    
    socket.emit("clientId", socketID)
    

    socket.on('join-room', payload => {
        peerID = payload.peerID
        roomID = payload.roomID
        currentPeerID = payload.peerID
        roomEndpoint = payload.roomEndpoint;
        socket.join(payload.roomEndpoint);
        users.push(payload.userID)
        socket.to(payload.roomEndpoint).emit('user-connected', {peerID: payload.peerID, socketID: socketID, userID: payload.userID, users, roomID, roomEndpoint})
        socket.emit("roomID", payload.roomID)     
        socket.on("disconnect", () => {
            console.log("Client disconnected, socketID:" , socketID, "peerID: ", payload.peerID)
            // socket.to(roomID).emit('user-disconnect', {socketID: socketID, peerID: currentPeerID}); 
            users.filter(user => user !== payload.userID)
            leaveRoom(payload.peerID, payload.roomID, payload.userID)
        
        })

        //********chat messaging are *************/
        // let chatHistory = [];
        // socket.on("send-message", payload => {
        //     console.log("send message triggeres, payload =>" ,payload)
            
        //     socket.to(roomID).emit('get-sended-message', {newMessage: payload.newMessage, chat: payload.chat})
        // })

        socket.on("chatMessage", (newMessage) => {
            // console.log(text)
            socket.emit('message', newMessage);
            socket.to(payload.roomEndpoint).emit('message', newMessage)
        }
        )

        
    })
    const leaveRoom =(peerID, roomID,userID) => {
        //todo: filter updated rooms
        socket.to(roomEndpoint).emit('user-disconnected', {peerID: peerID, roomID, userID: userID})
        
    }

    
}
