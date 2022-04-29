window.addEventListener('load', () => {
    let chatForm = document.getElementById('join-form');

    // e=event
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault(); // stops eg enter to submit
        let name = document.getElementById('name-input').value;
        let room = document.getElementById('room-input').value;


        sessionStorage.setItem('name', name);
        sessionStorage.setItem('room', room);

        window.location = './game.html';
    })

})