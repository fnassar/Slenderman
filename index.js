const MAX_USERS_ROOM = 4;
//Initialize the express 'app' object
let express = require('express');
const { use } = require('express/lib/application');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);

//Initialize socket.io
let io = require('socket.io');
io = new io.Server(server);

let updates = {}; // i think keeping a log of what each user did would be helpfull incase they get disconnected
let rooms = {}; // limit 5 people/room
let users = {};
//
//
// connect to server
io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);
    // get user data(done)
    socket.on('userData', (data) => {
        // save user name in an array
        socket.name = data.name;
        socket.roomName = data.room;
        if (rooms[socket.roomName] >= 1) {
            console.log('u');
            if (rooms[data.room] < MAX_USERS_ROOM) {
                rooms[socket.roomName]++;
                // update user data
                users[socket.name] = {
                    id: socket.id,
                    name: socket.name,
                    room: socket.roomName,
                    score: 0
                }
                console.log("users:", users);

                // io.to(socket.roomName).emit('newuserData', users);
                socket.join(socket.roomName);
                io.to(socket.roomName).emit('newuserData', users);
                console.log("room", rooms);
            } else {
                io.to(socket.roomName).emit('maxUsersReached');

            }
        } else {
            socket.roomName = data.room;
            updates[socket.roomName] = {};
            rooms[socket.roomName] = 1;
            // update user data
            users[socket.name] = {
                id: socket.id,
                name: socket.name,
                room: socket.roomName,
                score: 0
            }
            console.log("new users:", users);
            socket.join(socket.roomName);
            io.to(socket.roomName).emit('newuserData', users);
            console.log("new room", rooms);
        }
    })

    socket.on('disconnect', () => {
        console.log('connection ended, ', socket.id);
        rooms[socket.roomName]--;
        delete users[socket.name];
        console.log("room", rooms);
    })

    socket.on('newWin', (data) => {
        // updates the user score depending on username and moves everyone to next stage when data is found
        /* 
            data should have:
            {
                "game level":"#",
                usersData:{
                    users ... : #(score)
                }
            }
        */
        console.log("data:", data);

        if (data.objNum != "8") {

            if (updates[socket.roomName][data.name]) {
                updates[socket.roomName][data.name]++;
            } else {
                updates[socket.roomName][data.name] = 1;
            }

            // data.gameLevel++;
            let datatosend = {
                name: data.name,
                users: updates[socket.roomName],
                level: data.gameLevel
            };
            console.log("updates", datatosend);
            users[data.name].score++;
            io.to(socket.roomName).emit('newWin', datatosend);
            // change emit objects and update to 8
        } else {
            io.to(socket.roomname).emit('updateLevel', data.level);
        } 

    })
})


//run the createServer
let port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});