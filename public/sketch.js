// // Your code will go here
// // open up your console - if everything loaded properly you should see the latest ml5 version
// //console.log('ml5 version:', ml5.version);

//To change the camera https://editor.p5js.org/AndreasRef/sketches/HJVgGjmz4

let video;
let mobilenet;
let detector;
let detections = [];
let hints = [];

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
let lose;

let text_instructions = "Have you played a treasure hunt before? \n\n Let's make a trauma out of your favorite childhood game. \n \n Follow the hints and find the 8 pages hidden in this place. \n\nBut hurry! Because slemnderman is looking for you."


//for leaderboard button
let button_r;
let button_x;
let button_y;
let effect;

//for font
let font;
let current_page;

//to start game
let can_start = false;

//hints
let hint = "The IM department has cutting-edge technology. We're so lucky!"
let hint1 = "using my xbox controller and looking through the window, y'all look like sims"
let hint2 = "nothing like a book and pizza on a cold day of may"
let hint3 = "splish, splash, crash, trash"
let hint4 = "Jack b du, where are u"
let hint5 = "netflix and chill?, send some recs"
let hint6 = "i wonder if the koala kids are already here"
let hint7 = "balck and white thinking. let's write something down"

hint = hint1;   


function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else if (results[0].confidence>0.90){
        //console.log(results[0].label + (round(results[0].confidence*10)));
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

    can_start = true;

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
    lose = loadImage("/img/lose.jpg")
    win = loadImage("/img/win.jpg")


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
    //current_page = 1;



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

        //for hints
        displayHints();
        //console.log(rooms[myname]);
        //if (label != 'no object found') { console.log(level, label); }


        if (level == 1 && label == "forest") {
            hint = hint1;

            level++;
            let img_h = forest.height * (width - 80) / forest.width
            let y = (height - img_h) / 2;
            image(forest, 40, y, width - 80, img_h);
            // delay.delayTime(3000);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);
        } else if (level == 2 && label == "nonono") {
            hint = hint2;

            level++;
            let img_h = nonono.height * (width - 80) / nonono.width
            let y = (height - img_h) / 2;
            image(nonono, 40, y, width - 80, img_h);
            // delay.delayTime(3000);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);

        } else if (level == 3 && label == "leave me alone") {
            hint = hint3;

            level++;
            let img_h = leave_me_alone.height * (width - 80) / leave_me_alone.width
            let y = (height - img_h) / 2;
            image(leave_me_alone, 40, y, width - 80, img_h);
            // delay.delayTime(3000);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);

        } else if (level == 4 && label == "dont look") {
            hint = hint4;

            level++;
            let img_h = dont_look.height * (width - 80) / dont_look.width
            let y = (height - img_h) / 2;
            image(dont_look, 40, y, width - 80, img_h);
            // delay.delayTime(3000);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);

        } else if (level == 5 && label == "help me") {
            hint = hint5;

            level++;
            let img_h = help_me.height * (width - 80) / help_me.width
            let y = (height - img_h) / 2;
            image(help_me, 40, y, width - 80, img_h);
            // delay.delayTime(3000);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);

        } else if (level == 6 && label == "follows") {
            hint = hint6;

            level++;
            let img_h = follows.height * (width - 80) / follows.width
            let y = (height - img_h) / 2;
            image(follows, 40, y, width - 80, img_h);
            // delay.delayTime(3000);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);
        } else if (level == 7 && label == "cant run") {
            hint = hint7;

            level++;
            let img_h = cant_run.height * (width - 80) / cant_run.width
            let y = (height - img_h) / 2;
            image(cant_run, 40, y, width - 80, img_h);
            // delay.delayTime(3000);

            rooms[myname].score++;
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data);
        } else if (level == 8 && label == "always watches") {
            hint = hint8;

            let img_h = always_watches.height * (width - 80) / always_watches.width
            let y = (height - img_h) / 2;
            image(always_watches, 40, y, width - 80, img_h);
            // delay.delayTime(3000);

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
        fill(180);
        text("instructions", width / 2, 120);
        textSize(25);
        fill(0);
        text(text_instructions, 0, 210, width, height);



        if (can_start == true) {
            textSize(20);
            text("touch anywere to continue", width / 2, height - 150);
        } else if (can_start == false) {
            text("loading...", width / 2, height - 150);
        }

    } else if (gameState == "help") {
        image(wallpaper, 0, 0, width, height);
        //button return image
        image(button_return, button_x, button_y, button_r, button_r);
        //textSize(50);
        textFont(font);
        let message = "";
        message += "Level:" + level + "\n";
        message += "\n";
        message += "PLAYERS:\n";


        text(message, width / 2, height - 50);

    } else if (gameState == "lose") {
        image(lose, 0, 0, lose.width * height / lose.height, height)
        fill(200);
        textSize(70);
        textFont(font);
        textAlign(CENTER, TOP);
        text("YOU LOST", width / 2, height / 2 + 70);

    } else if (gameState == "win") {
        image(win, -win.width / 2, 0, win.width * height / win.height, height);
        fill(200);
        textSize(70);
        textFont(font);
        textAlign(CENTER, TOP);
        text("YOU WON", width / 2, height / 2);

        let a = createA('/', 'this is a link')
        a.position(width / 2, height / 2 + 90);
        a.style('font-family', 'Arial, Helvetica, sans-serif');
    }

}

function touchStarted() {
    if ((gameState == "instructions") && (can_start == true)) {
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

    //console.log(mouseX + "   " + mouseY)
}


function displayHints() {

    let box_height = hint_box.height * width / hint_box.width
    image(hint_box, 0, height - box_height / 1.5, width, box_height);

    // if (current_page == 1) {
    //     hint = "hint 1";
    // } else if (current_page == 2) {
    //     hint = "hint 2";
    // } else if (current_page == 3) {
    //     hint = "hint 3";
    // } else if (current_page == 4) {
    //     hint = "hint 4";
    // } else if (current_page == 5) {
    //     hint = "hint 5";
    // } else if (current_page == 6) {
    //     hint = "hint 6";
    // } else if (current_page == 7) {
    //     hint = "hint 7";
    // } else if (current_page == 8) {
    //     hint = "hint 8";
    // }

    textFont(font);
    textSize(20);
    textAlign(CENTER, TOP);
    text(hint, 0, height - box_height / 2, width, hint_box.height);

}