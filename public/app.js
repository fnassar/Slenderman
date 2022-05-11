// opens and connect to socket
let socket = io();
// add a div to log all users new wins
let logbox = document.getElementById('div_wins_record');
//listen for confirmation
socket.on('connect', () => {
        console.log("client connected via sockets");
        // save previous data
        let data = {
            "name": sessionStorage.getItem('name'),
            "room": sessionStorage.getItem('room')
        };
        socket.emit('userData', data);
    })
    // recieve prev msgs
socket.on('prevWins', (data) => {
    console.log(data);

    // load prev wins
    for (let i = 0; i < data.prevWins.length; i++) {
        let winn = document.createElement('li');
        winn.innerHTML = data.prevWins[i].name + " : " + data.prevWins[i].msg;
        logbox.appendChild(winn);
    }
})

socket.on('newWin', (data) => {
    console.log(data);
    let winn = document.createElement('li');
    winn.innerHTML = data.name + " : " + data.msg;
    logbox.appendChild(data);
})

window.addEventListener('load', () => {
    let username = document.getElementById('user-name');
    // console.log(sessionStorage.getItem);
    let rooms = {
        name: sessionStorage.getItem('name'),
        room: sessionStorage.getItem('room')
    };
    // if user enters without writting name
    if (!rooms.name || !rooms.room) {
        console.log("name or room not available");
        window.location = './';
    }

    console.log(rooms);
    console.log(logbox);

    socket.on('userData', rooms);

    // username.innerHTML = sessionStorage.getItem('name');

    let newWin = document.getElementById('newWin');
    let logWinsDiv = document.getElementById('div_wins_record');
    newWin.addEventListener('click', () => {
        let name = sessionStorage.getItem('name');
        chatObj = {
            'name': name,
            'msg': "msg"
        }
        socket.emit('newWin', chatObj);
    })
})