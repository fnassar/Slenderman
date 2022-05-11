// opens and connect to socket
let socket = io();
// add a div to log all users new wins
let logbox = document.getElementById('div_wins_record');
let rooms = {};

let level = 8;
let score = 0;
let myname;
let gameState;
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
    // socket.on('prevupdates', (data) => {
    //     console.log(data);
    //     // add instructions page stuff
    // })

socket.on('newWin', (data) => {
    console.log(data);
    level = data.level;
    rooms[data.name].score = data.users[data.name];
    console.log(rooms);

    // emit game stage to show the win then update the level
    // update game level
})
socket.on('lastLevel', (data) => {
    gameState = data[myname].winLose;
    rooms = data;

})
socket.on('newuserData', (data) => {
    rooms = {};
    rooms = data; // rewrite
    console.log(rooms);

})

window.addEventListener('load', () => {
    let username = sessionStorage.getItem('name');
    // console.log(sessionStorage.getItem);
    let current = {
        name: sessionStorage.getItem('name'),
        room: sessionStorage.getItem('room'),
        score: 0
    };
    // if user enters without writting name
    if (!current.name || !current.room) {
        console.log("name or room not available");
        window.location = './';
    } else {
        myname = current.name;
    }

    // socket.emit('userData', current);
})