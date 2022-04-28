let socket = io();

socket.on('connect', () => {
    console.log("client connected via sockets");

})

// window.addEventListener('load', () => {
//     // let submitButton = document.getElementById('send-button');

//     // submitButton.addEventListener('click', () => {
//     //     let name = document.getElementById('name-input').value;
//     //     let msg = document.getElementById('msg-input').value;
//     //     console.log(name, msg);
//     // })

// })


////ML5
//console.log('ml5 version:', ml5.version);

let img;
let detector;

function preload(){
    img = loadImage("/img/cat.jpg");
    detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
}

function setup() {
    createCanvas(1000, 1000);
    //console.log(detector);
    image(img, 0, 0);
    detector.detect(img, gotDetections);
}

function draw() {

}