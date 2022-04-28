let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);

//Initialize socket.io
//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

// connect to server
io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);
    socket.on('disconnect', () => {
        console.log("client: ", socket.id, "is disconnected");
    })
})

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});