// opens and connect to socket
let socket = io();
// add a div to log all users new wins
let logbox = document.getElementById('div_wins_record');
let rooms = {};
let level = 1;
let score = 0;
let myname;
//listen for confirmation
socket.on('connect', () => {
        console.log("client connected via sockets");
        // save previous data
        let data = {
            "name": sessionStorage.getItem('name'),
            "room": sessionStorage.getItem('room')
        };
        myname = sessionStorage.getItem('name');
        socket.emit('userData', data);
    })
    // recieve prev msgs
socket.on('prevupdates', (data) => {
    console.log(data);
    // add instructions page stuff
})

socket.on('newWin', (data) => {
    console.log(data);
    level++;
    console.log(level)
        // emit game stage to show the win then update the level
        // update game level
})
socket.on('updateLevel', (data) => {
    console.log(data);

})

window.addEventListener('load', () => {
    let username = sessionStorage.getItem('name');
    // console.log(sessionStorage.getItem);
    rooms[username] = {
        name: sessionStorage.getItem('name'),
        room: sessionStorage.getItem('room'),
        score: 0
    };
    console.log(rooms);
    // if user enters without writting name
    if (!rooms[username] || !rooms[username].room) {
        console.log("name or room not available");
        window.location = './';
    }

    console.log(rooms);

    socket.emit('userData', rooms);
})