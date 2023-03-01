let usersOnCall = [];
import { io } from './../server.js';

export const newConnectionHandler = client => {

    console.log("New connection:", client.id)

    client.emit("clientId", client.id)
    

    client.on("usersOnCall", payload => {
            usersOnCall.push({socketId: payload});
            client.emit("updateUsersOnCall", usersOnCall)
        client.broadcast.emit("updateUsersOnCall", usersOnCall)
    })

    client.on("startCall", payload => {
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzcall started for users: ", usersOnCall)
        
    })
    
    client.on("disconnect", () => {
        console.log("Client disconnected, client.id:" + client.id)
      usersOnCall = usersOnCall.filter(user => user.socketId !== client.id && "")
     client.emit("updateUsersOnCall", usersOnCall)
     client.broadcast.emit("updateUsersOnCall", usersOnCall)
    })

    // client.on("join", roomId => {
    //     const roomClients = usersOnCall;
    //     const numberOfClients = usersOnCall.length()


    // })
    
    
}