// // Your code will go here
// // open up your console - if everything loaded properly you should see the latest ml5 version
// //console.log('ml5 version:', ml5.version)


//To change the camera https://editor.p5js.org/AndreasRef/sketches/HJVgGjmz4




// let video_trained;
// let mobilenet;
// let classifier;

// //To train each item
// let page1;
// let page2;
// let page3;
// let page4;
// let page5;
// let page6;
// let page7;
// let page8;

// let trainButton;
// let saveButton; 

// let label = "loading model"



// function gotResults(error, results){
//     if (error) {
//         console.error(error);
//     }
//     console.log(results)
//     if (results[0].confidence>0.95){
//         label = results[0].label
//     } else {
//         label = "no object found"
//     }
//     classifier.classify(gotResults);
// }

// function modelReady() {
//     console.log("model is ready")
//     classifier.load("/models/model.json", customModelReady);
// }

// function customModelReady() {
//     console.log("Custom Model is ready")
//     label = "model ready";
//     classifier.classify(gotResults)
// }

// function videoReady() {
//     console.log("video is ready")
// }

// function whileTraining(loss){
//     if(loss == null) {
//         //console.log("training complete");
//         fill(255);
//         document.getElementById("title").innerHTML = "training complete"
//         classifier.classify(gotResults)
//     }
// }

// function setup() {
//     //to create canvas and put it in the background
//     canvas = createCanvas(windowWidth, windowHeight);
//     canvas.position(0, 0);
//     canvas.style('z-index', '-1');

//     //to set up the front camera on the phone
//     var constraints = {
//         audio: false,

//         ///TO TEST ON PHONE, COMMENT IN THIS PART AND COMMENT OUT THE OTHER ONE 
//         // video: {
//         //     facingMode: {
//         //         exact: "environment"
//         //     }
//         // }
//         video: {
//           facingMode: "user"
//         } 
//     };

//     video_trained = createCapture(constraints);
//     video_trained.hide();

//     //COCOSD
//     mobilenet = ml5.featureExtractor('MobileNet', modelReady);
//     classifier = mobilenet.classification(video_trained, {numLabels: 8} , videoReady);


//     //To train ML5
//     page1 = createButton('always watches');
//     page1.mousePressed(function(){
//         classifier.addImage('always watches');
//     });

//     page2 = createButton('nonono');
//     page2.mousePressed(function(){
//         classifier.addImage('nonono');
//     });

//     page3 = createButton('leave me alone');
//     page3.mousePressed(function(){
//         classifier.addImage('leave me alone');
//     });

//     page4 = createButton('dont look');
//     page4.mousePressed(function(){
//         classifier.addImage('dont look');
//     });

//     page5 = createButton('help me');
//     page5.mousePressed(function(){
//         classifier.addImage('help me');
//     });

//     page6 = createButton('follows');
//     page6.mousePressed(function(){
//         classifier.addImage('follows');
//     });

//     page7 = createButton('cant run');
//     page7.mousePressed(function(){
//         classifier.addImage('cant run');
//     });

//     page8 = createButton('forest');
//     page8.mousePressed(function(){
//         classifier.addImage('forest');
//     });

//     /////// to train and save

//     trainButton = createButton('train');
//     trainButton.mousePressed(function(){
//         classifier.train(whileTraining);
//     });

//     saveButton = createButton('save');
//     saveButton.mousePressed(function(){
//         classifier.save();
//     });
// }

// function draw() {
//     background(255, 0, 0);
//     image(video_trained, 0, 0, video_trained.width, video_trained.height); //video on canvas, position, dimensions
//     fill(0);
//     rect(20, 400, 100, 20);
//     fill(255)
//     text(label, 20, 400, 300, 300);
// }





let video;
let mobilenet;
let detector;
let detections = [];

let gameState;
let game;

let label = "loading model";

//For images
let always_watches;
let nonono;
let leave_me_alone;
let dont_look;
let help_me;
let follows;
let cant_run;
let forest;
let button;
let wallpaper;

//for leaderboard button
let button_r;
let button_x;
let button_y;
let effect;

//for font
let font;



function gotResults(error, results){
    if (error) {
        console.error(error);
    }
    else if (results[0].confidence>0.93){
        label = results[0].label
    } else {
        label = "no object found"
    }
    detector.classify(gotResults);
}

function modelReady() {
    console.log("model is ready")
    detector.load("/models/model.json", customModelReady);
}

function customModelReady() {
    console.log("Custom Model is ready")
    label = "model ready";
    detector.classify(gotResults)
}

function videoReady() {
    console.log("video is ready")
}


function setup() {

    button_r = 100;
    button_x = windowWidth - 110;
    button_y = 10;

    //To load images of pages
    always_watches = loadImage("/img/pages/no_eyes.JPEG");
    nonono = loadImage("/img/pages/nonono.JPEG");
    leave_me_alone = loadImage("/img/pages/alone.JPEG");
    dont_look = loadImage("/img/pages/dont_look.JPEG");
    help_me = loadImage("/img/pages/help_me.JPEG");
    follows = loadImage("/img/pages/follows.JPEG");
    cant_run = loadImage("/img/pages/cant_run.JPEG");
    forest = loadImage("/img/pages/forest.JPEG");
    button = loadImage("/img/button.png");
    wallpaper = loadImage("/img/wallpaper.jpg");
    effect = loadImage("/img/effect.png");

    //to load font
    font = loadFont('/img/Slenderman.ttf');

    //to create canvas and put it in the background
    canvas = createCanvas(windowWidth, windowHeight);
    //canvas.parent('canvas_container');
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
    video.hide();

    //COCOSD
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    detector = mobilenet.classification(video, {numLabels: 8} , videoReady);

    //To start game:
    gameState = "instructions";

    //     //To start game:
//     gameState = "instructions";
//     // replace with ml5 objects
//     let objects = ["1", "2", "3", "4", "5", "6", "7", "8"];
//     // replace with hints
//     let hints = ["1", "2", "3", "4", "5", "6", "7", "8"];
//     game = new Game(objects, hints, user);
// }

}

function draw() {
    //translate(width, 0); // move to far corner
    //scale(-1.0, 1.0); // flip x-axis backwards

    if (gameState == "start") {
        background(255, 0, 0);
        //image(video, 0, 0, video.width, video.height); //video on canvas, position, dimensions
        image(video, 0, 0, width, height); //video on canvas, position, dimensions
        image(effect, 0, 0, width, height)

        //For LEADERBOARD button
        image(button, button_x, button_y, button_r, button_r);

        // fill(0);
        // rect(20, 400, 100, 20);
        // fill(255)
        // text(label, 20, 400, 300, 300);

        //["always watches","nonono","leave me alone","dont look","help me","follows","cant run","forest"]}}

        if(label == "always watches"){
            //background(255, 255, 0);
            image(always_watches, 0, 0, width, height);
        }
        else if(label == "nonono"){
            //background(255, 255, 0);
            image(nonono, 0, 0, width, height);
        }
        else if(label == "leave me alone"){
            //background(255, 255, 0);
            image(leave_me_alone, 0, 0, width, height);
        }
        else if(label == "dont look") {
            image(dont_look, 0, 0, width, height);
        }
        else if(label == "help me") {
            image(help_me, 0, 0, width, height);
        }
        else if(label == "follows") {
            image(follows, 0, 0, width, height);
        }
        else if(label == "cant run") {
            image(cant_run, 0, 0, width, height);
        }
        else if(label == "forest") {
            image(forest, 0, 0, width, height);
        }

    } else if (gameState == "instructions") {
        image(wallpaper, 0, 0, width, height);
        push();
        //translate(0, height);
        //rotate(90);
        textSize(50);
        textFont(font);
        text("instructions", 13, 212);
        pop();
    } else if (gameState == "help") {
        image(wallpaper, 0, 0, width, height);
        //button image
        image(button, button_x, button_y, button_r, button_r);
        //textSize(50);
        textFont(font);
        text("insert message here", 10, 50);
        
    }

}



function touchStarted() {
    if (gameState == "instructions") {
        //if ((mouseX > button_x) && (mouseX < button_x+button_r) && (mouseY > button_y) && (mouseY < button_y+button_r)) {
            gameState = "start"
        //}

    } else if (gameState == "start") {
        if ((mouseX > button_x) && (mouseX < button_x+button_r) && (mouseY > button_y) && (mouseY < button_y+button_r)) {
            gameState = "help"
        }

    } else if (gameState == "help") {
        if ((mouseX > button_x) && (mouseX < button_x+button_r) && (mouseY > button_y) && (mouseY < button_y+button_r)) {
            gameState = "start"
        }
    }

    console.log(mouseX + "   " + mouseY)
}

