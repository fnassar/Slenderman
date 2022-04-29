//Initialize the express 'app' object
let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

let wins = []; // i think keeping a log of what each user did would be helpfull incase they get disconnected
let rooms = {}; // limit 5 people/room
let users = {};
// connect to server
io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);
    // update rooms and stuff yk
    socket.on('userData', (data) => {
        socket.name = data.name;
        users[socket.name] = socket.id;
        console.log(users);

        socket.roomname = data.room;

        socket.join(socket.roomname);
        if (rooms[socket.roomname]) {
            rooms[socket.roomname]++;
        } else {
            rooms[socket.roomname] = 1;
        }
        console.log(rooms);
    })

    let data = { prevWins: wins }; //change
    socket.to(socket.roomname).emit('prevWins', data); //change
    socket.on('disconnect', () => {
        console.log("client: ", socket.id, "is disconnected");
        rooms[socket.room]++;
        delete users[socket.name]
    })
    socket.on('newWin', (data) => { // change
        wins.push(data); //change
        console.log(wins); //change
        io.to(socket.roomname).emit('newWin', data);


    })

})

//run the createServer
let port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});