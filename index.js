const MAX_USERS_ROOM = 5;
//Initialize the express 'app' object
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

let wins = []; // i think keeping a log of what each user did would be helpfull incase they get disconnected
let rooms = {}; // limit 5 people/room
let users = {};
//
//
// connect to server
io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);
    //
    // get user data
    socket.on('userData', (data) => {
        // save user name in an array
        socket.name = data.name;
        users[socket.name] = socket.id;

        console.log("users:", users);

        // MODIFIED POST CLASS - limiting number of people in room
        if (rooms[data.room]) {
            if (rooms[data.room] < MAX_USERS_ROOM) {
                //let the socket join room of choice
                socket.roomName = data.room; // we will add this data to the socket only after we can verify that there is space
                socket.join(socket.roomName);
                rooms[socket.roomName]++;
            } else {
                socket.emit('maxUsersReached');
            }
        } else {
            socket.roomName = data.room;
            socket.join(socket.roomName);
            rooms[socket.roomName] = 1;
        }

        console.log(rooms);

    })

    //send old messages
    let data = { prevWins: wins }; //change
    socket.to(socket.roomname).emit('prevWins', data);
    // on disconnection
    socket.on('disconnect', () => {
        console.log('connection ended, ', socket.id);
        rooms[socket.roomName]--;
        delete users[socket.name];
    })

    socket.on('newWin', (data) => { // change
        wins.push(data); //change
        console.log("wins:", wins); //change
        io.to(socket.roomname).emit('newWin', data);


    })

})

//run the createServer
let port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});