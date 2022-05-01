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
    logbox.appendChild(data);
})


// // Your code will go here
// // open up your console - if everything loaded properly you should see the latest ml5 version
// //console.log('ml5 version:', ml5.version);

    console.log(rooms);
    console.log(logbox);

    socket.on('userData', rooms);

    username.innerHTML = sessionStorage.getItem('name');

    console.log("this is a test");

// function setup() {
//   //to create canvas and put it in the background
//   canvas = createCanvas(windowWidth,windowHeight);
//   canvas.position(0, 0);
//   //canvas.style('z-index', '-1');
//   //console.log(detector);
//   //image(img, 0, 0);
//   video = createCapture(VIDEO);
//   //video.size(height, height)
//   video.size(640, 480);
//   video.hide();
//   detector.detect(video, gotDetections);
// }

// //to resixe window every time there's a change
// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight);
// }

// function draw() {
//   background(0);
//   image(video, 0, 0)//, video.height, video.height);

//   for (i in detections){
//     let object = detections[i];
//      stroke(0, 255, 0);
//     strokeWeight(4);
//     noFill();
//     rect(object.x, object.y, object.width, object.height);
//     noStroke();
//     fill(255);
//     textSize(24);
//     text(object.label, object.x + 10, object.y + 24);

//     if(object.label == "bottle"){
//       background(255, 255, 0);
//     }

//     if(object.label == "cell phone"){
//       background(255, 0, 0);
//     }
//   }
// }
