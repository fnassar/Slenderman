// // Your code will go here
// // open up your console - if everything loaded properly you should see the latest ml5 version
// //console.log('ml5 version:', ml5.version);

//To change the camera https://editor.p5js.org/AndreasRef/sketches/HJVgGjmz4

let video;
let mobilenet;
let detector;
let detections = [];
let hints = [];


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
let button_return;
let wallpaper;
let hint_box

//for leaderboard button
let button_r;
let button_x;
let button_y;
let effect;

//for font
let font;

let current_page;



function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else if (results[0].confidence > 0.90) {
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
    console.log("Custom Model is ready");
    label = "model ready";
    detector.classify(gotResults)
}

function videoReady() {
    console.log("video is ready");
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
    button_return = loadImage("/img/button_return.png");
    wallpaper = loadImage("/img/wallpaper.jpg");
    effect = loadImage("/img/effect.png");
    hint_box = loadImage("/img/hint_box.png");

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
    detector = mobilenet.classification(video, { numLabels: 8 }, videoReady);

    //To start game:
    gameState = "instructions";
    current_page = 1;



}

function draw() {
    //translate(width, 0); // move to far corner
    //scale(-1.0, 1.0); // flip x-axis backwards

    if (gameState == "start") {
        //background(255, 0, 0);
        image(video, 0, 0, video.width, video.height); //video on canvas, position, dimensions
        //image(video, 0, 0, width, height); //video on canvas, position, dimensions
        image(effect, 0, 0, width, height)

        //For LEADERBOARD button
        image(button, button_x, button_y, button_r, button_r);

        // fill(0);
        // rect(20, 400, 100, 20);
        // fill(255)
        // text(label, 20, 400, 300, 300);

        //["always watches","nonono","leave me alone","dont look","help me","follows","cant run","forest"]}}

        displayHints();
        console.log(rooms);
        if (label != 'no object found') { console.log(level, label); }
        if (level == 1 && label == "always watches") {
            //background(255, 255, 0);
            image(always_watches, 0, 0, width, height);
            rooms.score++;
            let data = {
                gameLevel: level,
                score: rooms.score
            };
            socket.emit('newWin', data);
        } else if (level == 2 && label == "nonono") {
            //background(255, 255, 0);
            image(nonono, 0, 0, width, height);
            rooms.score++;
            let data = {
                gameLevel: level,
                score: rooms.score
            };
            socket.emit('newWin', data);
        } else if (level == 3 && label == "leave me alone") {
            //background(255, 255, 0);
            image(leave_me_alone, 0, 0, width, height);
            rooms.score++;
            let data = {
                gameLevel: level,
                score: rooms.score
            };
            socket.emit('newWin', data);
        } else if (level == 4 && label == "dont look") {
            image(dont_look, 0, 0, width, height);
            rooms.score++;
            let data = {
                gameLevel: level,
                score: rooms.score
            };
            socket.emit('newWin', data);
        } else if (level == 5 && label == "help me") {
            image(help_me, 0, 0, width, height);
            rooms.score++;
            let data = {
                gameLevel: level,
                score: rooms.score
            };
            socket.emit('newWin', data);
        } else if (level == 6 && label == "follows") {
            image(follows, 0, 0, width, height);
            rooms.score++;
            let data = {
                gameLevel: level,
                score: rooms.score
            };
            socket.emit('newWin', data);
        } else if (level == 7 && label == "cant run") {
            image(cant_run, 0, 0, width, height);
            rooms.score++;
            let data = {
                gameLevel: level,
                score: rooms.score
            };
            socket.emit('newWin', data);
        } else if (level == 8 && label == "forest") {
            image(forest, 0, 0, width, height);
            rooms.score++;
            let data = {
                gameLevel: level,
                score: rooms.score
            };
            socket.emit('newWin', data);
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
        //button return image
        image(button_return, button_x, button_y, button_r, button_r);
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
        if ((mouseX > button_x) && (mouseX < button_x + button_r) && (mouseY > button_y) && (mouseY < button_y + button_r)) {
            gameState = "help"
        }

    } else if (gameState == "help") {
        if ((mouseX > button_x) && (mouseX < button_x + button_r) && (mouseY > button_y) && (mouseY < button_y + button_r)) {
            gameState = "start"
        }
    }

    console.log(mouseX + "   " + mouseY)
}


function displayHints() {

    let box_height = hint_box.height * width / hint_box.width
    image(hint_box, 0, height - box_height, width, box_height);
    let hint;

    if (current_page == 1) {
        hint = "hola";
    } else if (current_page == 2) {

    } else if (current_page == 3) {

    } else if (current_page == 4) {

    } else if (current_page == 5) {

    } else if (current_page == 6) {

    } else if (current_page == 7) {

    } else if (current_page == 8) {

    }



}