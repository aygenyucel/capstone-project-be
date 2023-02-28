export const newConnectionHandler = client => {

    console.log("New connection:", client.id)

    client.emit("welcome", {message: `Hello ${client.id}`})

    client.on("disconnect", () => {
        console.log("Client disconnected, client.id:" + client.id)
    })
    
}