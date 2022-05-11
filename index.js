const MAX_USERS_ROOM = 4;
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

let updates = {}; // i think keeping a log of what each user did would be helpfull incase they get disconnected
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
                updates[socket.name] = 0;
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
    let data = { prevWins: updates }; //change
    socket.to(socket.roomname).emit('prevupdates', data);
    // on disconnection
    socket.on('disconnect', () => {
        console.log('connection ended, ', socket.id);
        rooms[socket.roomName]--;
        delete users[socket.name];
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
            updates[socket.roomName]++;
            data.gameLevel++;
            let datatosend = {
                users: updates,
                level: data.gameLevel
            };
            io.to(socket.roomname).emit('newWin', datatosend);
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