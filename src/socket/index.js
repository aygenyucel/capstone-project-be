
import  dotenv  from 'dotenv';
import { io } from './../server.js';

dotenv.config();

//peerJSRoom
const usersOnCall = []

//simplePeerRoom
const chatRooms = []
let currentRoomID = ""
let otherUsersInThisRoom = [];

//PeerJSGroupRoom
let roomID = ''
let currentUserID = ''
let currentChatRooms = []

export const newConnectionHandler = socket => {
    
    const socketID = socket.id;
    
    console.log("New connection:", socket.id)
    
    socket.emit("clientId", socket.id)
    
    //*********************PeerJSGroupRoom **********************/
    socket.on('join-room', payload => {
        roomID = payload.roomID
        currentUserID = payload.userID
        currentChatRooms = payload.currentChatRooms
        console.log("currentChatRooms",currentChatRooms)
        // allUsersInTheRoom.push(payload.userID)
        // socket.emit("all-users-in-room", allUsersInTheRoom)
        socket.join(payload.roomID)
        socket.to(payload.roomID).emit('user-connected', {userID: payload.userID})
        
    })
    
    socket.on("disconnect", () => {
        console.log("Client disconnected, socket.id:" , socket.id)
        
    //*********************PeerJSGroupRoom **********************/
        socket.to(roomID).emit('user-disconnect', {socketID: socketID, userID: currentUserID});

    //****************** SimplePeerRoom Component******************/
        const roomIndex = chatRooms.findIndex((room) => room.roomID === currentRoomID);
        if (roomIndex !== -1) {
            const updatedUsers = (chatRooms[roomIndex].users).filter((userID) => userID !== socketID)
            chatRooms[roomIndex].users = updatedUsers
        }
        
    })

    //****************** SimplePeerRoom Component******************/

    socket.on("joinRoom", roomID => {
        const roomIndex = chatRooms.findIndex(room => room.roomID === roomID)
        if(roomIndex !== -1){
            chatRooms[roomIndex] = {roomID: roomID, users: [...chatRooms[roomIndex].users, socketID] }
            
            otherUsersInThisRoom = (chatRooms[roomIndex].users).filter((user) => user !== socketID)
            console.log("otherUserInThisRoom:", otherUsersInThisRoom)
            console.log(chatRooms)
        } else {
            chatRooms.push({roomID, users: [socketID] })
            console.log(chatRooms)
        }
        
        socket.emit("otherUsersInThisRoom", otherUsersInThisRoom)
        currentRoomID = roomID;
        console.log("you joined a room => currentRoomID: ", currentRoomID)
        console.log("your socket id is => socketID: ", socketID )
        
    })


    socket.on("sendingSignal", payload => {
        io.to(payload.otherUserId).emit('newUserJoined', {signal: payload.signalData, callerID: payload.otherUserId})
        console.log("new user joined! userId: ", payload.otherUserId)
    })


    //***** */
    socket.on("sendingReturningSignal", payload => {
        io.to(payload.callerID).emit('receivingReturnedSignal', { signal: payload.signalData, id: socketID });
        console.log("---------------------------")
    })
    //************************************* */
}