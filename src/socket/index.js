
import  dotenv  from 'dotenv';
import { io } from './../server.js';

dotenv.config();

let roomEndpoint = ''
let currentPeerID = ''

export const newConnectionHandler = socket => {
    
    
    const socketID = socket.id;
    
    console.log("New connection:", socketID)
    
    socket.emit("clientId", socketID)

    socket.on('join-room', payload => {
        roomEndpoint = payload.roomEndpoint
        currentPeerID = payload.peerID
        socket.join(payload.roomEndpoint)
        socket.to(payload.roomEndpoint).emit('user-connected', {peerID: payload.peerID, socketID: socketID, userID: payload.userID})
        
        
        socket.on("disconnect", () => {
            console.log("Client disconnected, socketID:" , socketID, "peerID: ", payload.peerID)
            // socket.to(roomEndpoint).emit('user-disconnect', {socketID: socketID, peerID: currentPeerID}); 
            leaveRoom(payload.peerID, payload.roomEndpoint, payload.userID)
        })
    })
    const leaveRoom =(peerID, roomEndpoint, userID) => {
        //todo: filter updated rooms
        socket.to(roomEndpoint).emit('user-disconnected', {peerID: peerID, userID: userID})
    }
}