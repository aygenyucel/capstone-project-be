
import  dotenv  from 'dotenv';
import { io } from './../server.js';

dotenv.config();

const users = []

export const newConnectionHandler = socket => {
    
    const socketID = socket.id;
    
    console.log("New connection:", socketID)
    
    socket.emit("clientId", socketID)

    socket.on('join-room', payload => {
        
        socket.join(payload.roomEndpoint)
        socket.to(payload.roomEndpoint).emit('user-connected', {peerID: payload.peerID, socketID: socketID, userID: payload.userID})
        
        if(users.find(user => user === payload.userID) === undefined){
            users.push(payload.userID)
            console.log("userssssssss after join", users)
        }
        socket.broadcast.emit("user-join", {users});
        
        socket.on("disconnect", () => {
            console.log("Client disconnected, socketID:" , socketID, "peerID: ", payload.peerID);
            // socket.to(roomEndpoint).emit('user-disconnect', {socketID: socketID, peerID: currentPeerID}); 
            leaveRoom(payload.peerID, payload.roomEndpoint, payload.userID)
            
            const index = users.findIndex(user => user === payload.userID)
            users.splice(index,1)
            socket.emit("user-left", {peerID: payload.peerID, userID: payload.userID, users, roomID})
            console.log("users after left", users)
        })


        const leaveRoom =(peerID, roomEndpoint, userID) => {
            //todo: filter updated rooms
            console.log("user-disconnected: userID", userID)
            socket.to(roomEndpoint).emit('user-disconnected', {peerID: peerID, userID: userID, users})
             
            
        }
    })
    
}