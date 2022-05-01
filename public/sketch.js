// // Your code will go here
// // open up your console - if everything loaded properly you should see the latest ml5 version
// //console.log('ml5 version:', ml5.version);

let img;
let video;
let detector;
let detections = [];

function preload() {
    img = loadImage("/img/cat.jpg");
    detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
    if (error) {
        console.error(error);
    }
    detections = results;
    detector.detect(video, gotDetections);
}

function setup() {
    const myCanvas = createCanvas(612, 408);
    myCanvas.parent("canvas_container");
    //console.log(detector);
    //image(img, 0, 0);
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
    // error here no clue why
    detector.detect(video, gotDetections);
}


function draw() {
    translate(width, 0); // move to far corner
    scale(-1.0, 1.0); // flip x-axis backwards
    image(video, 0, 0, width, height); //video on canvas, position, dimensions

    for (i in detections) {
        let object = detections[i];
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(object.x, object.y, object.width, object.height);
        noStroke();
        fill(255);
        textSize(24);
        text(object.label, object.x + 10, object.y + 24);

    }
}