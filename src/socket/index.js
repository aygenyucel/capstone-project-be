
import  dotenv  from 'dotenv';
import { io } from './../server.js';

dotenv.config();

let roomID = ''
let currentPeerID = ''

export const newConnectionHandler = socket => {
    
    
    const socketID = socket.id;
    
    console.log("New connection:", socketID)
    
    socket.emit("clientId", socketID)

    socket.on('join-room', payload => {
        roomID = payload.roomID
        currentPeerID = payload.peerID
        socket.join(payload.roomID)
        socket.to(payload.roomID).emit('user-connected', {peerID: payload.peerID, socketID: socketID})
        
        
        socket.on("disconnect", () => {
            console.log("Client disconnected, socketID:" , socketID, "peerID: ", payload.peerID)
            // socket.to(roomID).emit('user-disconnect', {socketID: socketID, peerID: currentPeerID}); 
            leaveRoom(payload.peerID, payload.roomID)
        })
    })
    const leaveRoom =(peerID, roomID) => {
        //todo: filter updated rooms
        socket.to(roomID).emit('user-disconnected', {peerID: peerID})
    }
}