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
        image(wallpaper, 0, 0, width, height);
        image(video, 0, 0, video.width * height / video.height, height); //video on canvas, position, dimensions
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
        // console.log(rooms[myname]);
        if (label != 'no object found') { console.log(level, label); }



        if (level == 1 && label == "forest") {
            level++;
            let img_h = forest.height * (width - 80) / forest.width
            let y = (height - img_h) / 2;
            image(forest, 40, y, width - 80, img_h);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);
        } else if (level == 2 && label == "nonono") {
            level++;
            let img_h = nonono.height * (width - 80) / nonono.width
            let y = (height - img_h) / 2;
            image(nonono, 40, y, width - 80, img_h);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);

        } else if (level == 3 && label == "leave me alone") {
            level++;
            let img_h = leave_me_alone.height * (width - 80) / leave_me_alone.width
            let y = (height - img_h) / 2;
            image(leave_me_alone, 40, y, width - 80, img_h);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);

        } else if (level == 4 && label == "dont look") {
            level++;
            let img_h = dont_look.height * (width - 80) / dont_look.width
            let y = (height - img_h) / 2;
            image(dont_look, 40, y, width - 80, img_h);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);

        } else if (level == 5 && label == "help me") {
            level++;
            let img_h = help_me.height * (width - 80) / help_me.width
            let y = (height - img_h) / 2;
            image(help_me, 40, y, width - 80, img_h);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);

        } else if (level == 6 && label == "follows") {
            level++;
            let img_h = follows.height * (width - 80) / follows.width
            let y = (height - img_h) / 2;
            image(follows, 40, y, width - 80, img_h);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);
        } else if (level == 7 && label == "cant run") {
            level++;
            let img_h = cant_run.height * (width - 80) / cant_run.width
            let y = (height - img_h) / 2;
            image(cant_run, 40, y, width - 80, img_h);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);
        } else if (level == 8 && label == "always watches") {

            let img_h = always_watches.height * (width - 80) / always_watches.width
            let y = (height - img_h) / 2;
            image(always_watches, 40, y, width - 80, img_h);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);
        }

    } else if (gameState == "instructions") {

        image(wallpaper, 0, 0, width, height);
        textAlign(CENTER, TOP);
        textSize(50);
        textFont(font);
        text("instructions", width / 2, 212);
        textSize(20);
        text("touch anywere to continue", width / 2, height - 200);


    } else if (gameState == "help") {
        image(wallpaper, 0, 0, width, height);
        //button return image
        image(button_return, button_x, button_y, button_r, button_r);
        //textSize(50);
        textFont(font);
        text("insert message here", width / 2, height - 50);

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
    image(hint_box, 0, height - box_height / 1.5, width, box_height);
    let hint;

    if (current_page == 1) {
        hint = "hint 1";
    } else if (current_page == 2) {
        hint = "hint 2";
    } else if (current_page == 3) {
        hint = "hint 3";
    } else if (current_page == 4) {
        hint = "hint 4";
    } else if (current_page == 5) {
        hint = "hint 5";
    } else if (current_page == 6) {
        hint = "hint 6";
    } else if (current_page == 7) {
        hint = "hint 7";
    } else if (current_page == 8) {
        hint = "hint 8";
    }

    textFont(font);
    textSize(20);
    textAlign(CENTER, TOP);
    text(hint, width / 2, height - box_height / 2);

}