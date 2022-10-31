import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8000 });

server.on("connection", socket => 
    socket.on("message", data => 
        server.clients.forEach(client => client.send(data))
    )
)
