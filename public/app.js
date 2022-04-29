// opens and connect to socket
let socket = io();
// add a div to log all users new wins
let logbox = document.getElementById('logprevstuff');
//listen for confirmation
socket.on('connect', () => {
        console.log("client connected via sockets");
        // save previous data
        let data = {
            "name": sessionStorage.getItem('name'),
            "room": sessionStorage.getItem('room')
        }
        socket.emit('userData', data);
    })
    // recieve prev msgs
socket.on('prevWins', (data) => {
    console.log(data);

    // load prev chats
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
    logbox.appendChild(winn);
})



window.addEventListener('load', () => {
    let username = document.getElementById('user-name');
    // console.log(sessionStorage.getItem);
    let rooms = {
        name: sessionStorage.getItem('name'),
        room: sessionStorage.getItem('room')
    }

    console.log(rooms);

    socket.on('userData', rooms);

    username.innerHTML = sessionStorage.getItem('name');

    let chatForm = document.getElementById('chat-form');

    // e=event
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault(); // stops eg enter to submit
        let name = sessionStorage.getItem('name');
        let msg = document.getElementById('msg-input').value;

        chatObj = {
            'name': name,
            'msg': msg
        }

        socket.emit('chatMessage', chatObj);
    })
})