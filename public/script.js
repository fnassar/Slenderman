let socket = io();

socket.on('connect', () => {
    console.log("client connected via sockets");

})

window.addEventListener('load', () => {
    // let submitButton = document.getElementById('send-button');

    // submitButton.addEventListener('click', () => {
    //     let name = document.getElementById('name-input').value;
    //     let msg = document.getElementById('msg-input').value;
    //     console.log(name, msg);
    // })

})