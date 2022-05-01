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
    image(video, 0, 0);

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

// // function setup() {
// //   //to create canvas and put it in the background
// //   canvas = createCanvas(windowWidth,windowHeight);
// //   canvas.position(0, 0);
// //   //canvas.style('z-index', '-1');
// //   //console.log(detector);
// //   //image(img, 0, 0);
// //   video = createCapture(VIDEO);
// //   //video.size(height, height)
// //   video.size(640, 480);
// //   video.hide();
// //   detector.detect(video, gotDetections);
// // }

// // //to resixe window every time there's a change
// // function windowResized(){
// //   resizeCanvas(windowWidth, windowHeight);
// // }

// // function draw() {
// //   background(0);
// //   image(video, 0, 0)//, video.height, video.height);

// //   for (i in detections){
// //     let object = detections[i];
// //      stroke(0, 255, 0);
// //     strokeWeight(4);
// //     noFill();
// //     rect(object.x, object.y, object.width, object.height);
// //     noStroke();
// //     fill(255);
// //     textSize(24);
// //     text(object.label, object.x + 10, object.y + 24);

// //     if(object.label == "bottle"){
// //       background(255, 255, 0);
// //     }

// //     if(object.label == "cell phone"){
// //       background(255, 0, 0);
// //     }
// //   }
// // }