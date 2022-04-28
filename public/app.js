
// opens and connect to socket
let socket = io();

//listen for confirmation
socket.on('connect', () => {
  console.log("client connected via sockets");
})



// // Your code will go here
// // open up your console - if everything loaded properly you should see the latest ml5 version
// //console.log('ml5 version:', ml5.version);

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