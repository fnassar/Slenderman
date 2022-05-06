// // Your code will go here
// // open up your console - if everything loaded properly you should see the latest ml5 version
// //console.log('ml5 version:', ml5.version);


//To change the camera https://editor.p5js.org/AndreasRef/sketches/HJVgGjmz4


let video;
let detector;
let detections = [];

let gameState;

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
    //to create canvas and put it in the background
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas_container');
    canvas.position(0, 0);
    canvas.style('z-index', '-1');

    //to set up the front camera on the phone
    var constraints = {
        audio: false,

        ///TO TEST ON PHONE, COMMENT IN THIS PART AND COMMENT OUT THE OTHER ONE 
        // video: {
        //     facingMode: {
        //         exact: "environment"
        //     }
        // }
        video: {
            facingMode: "user"
        }
    };
    video = createCapture(constraints);
    //video.size(windowHeight, 480);
    video.hide();

    detector.detect(video, gotDetections);

    //To start game:
    gameState = "instructions";
}

// // // //to resize window every time there's a change
// function windowResized(){
//     resizeCanvas(windowWidth, windowHeight);
// }


function draw() {
    // translate(width, 0); // move to far corner
    // scale(-1.0, 1.0); // flip x-axis backwards


    if (gameState == "start") {
        background(255, 0, 0);
        image(video, 0, 0, video.width, video.height); //video on canvas, position, dimensions

        square(width - 50, 0, 50)

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

            // if(object.label == "bottle"){
            //     background(255, 255, 0);
            // }

            // if(object.label == "cell phone"){
            //     background(255, 0, 0);
            // }
        }
    } else if (gameState == "instructions") {
        background(255, 255, 0);
    } else if (gameState == "help") {
        rect(20, 20, width - 40, height - 40)
    }
}

function touchStarted() {
    if (gameState == "instructions") {
        gameState = "start"
    } else if (gameState == "start") {
        if ((mouseX > width - 50) && (mouseY < 50)) {
            gameState = "help"
        }
    } else if (gameState == "help") {
        if ((mouseX > width - 50) && (mouseY < 50)) {
            gameState = "start"
        }
    }
}