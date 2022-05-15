// // // // // VARIABLES

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

//For text (hints are displayed in order based on the level)
let font;
let text_instructions = "Have you played a treasure hunt before? \n\n Let's make a trauma out of your favorite childhood game. \n \n Follow the hints and find the 8 pages hidden in this place. \n\nBut hurry! Because slemnderman is looking for you."
let hint = "The IM department has cutting-edge technology. We're so lucky!"
let hint1 = "using my xbox controller and looking through the window, y'all look like sims"
let hint2 = "nothing like a book and pizza on a cold day of may"
let hint3 = "splish, splash, your opinion is trash"
let hint4 = "Jack b du, where are u?"
let hint5 = "netflix and chill?, send some recs"
let hint6 = "i wonder if the koala kids are already here"
let hint7 = "black and white thinking. let's write something down"

//For leaderboard button (top right corner)
let button_r;
let button_x;
let button_y;

//For video and object detector
let video;
let mobilenet;
let detector;
let effect; //drawn of top of the 'video' image
let label = "loading model"; //to identify what the detector has scanned
let can_start = false; //'true' after the model is loaded




// // // // // FUNCTIONS TO PREPARE ML5.JS (see training.js for further details)

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else if (results[0].confidence > 0.95) { //label only changes if the detection is 95% accurate
        label = results[0].label
    } else {
        label = "no object found"
    }
    detector.classify(gotResults);
}

function modelReady() {
    console.log("model is ready")
    detector.load("/models/model.json", customModelReady); //detector loads model trained by us
}

function customModelReady() {
    console.log("Custom Model is ready");
    label = "model ready";
    detector.classify(gotResults)

    can_start = true; //when our model is loaded, the user can move to the next gameState
}

function videoReady() {
    console.log("video is ready");
}



// // // // // FUNCTIONS TO INITIALIZE GAME

function setup() {

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

    //For leaderboard button (top right corner)
    button_r = 100;
    button_x = windowWidth - 110;
    button_y = 10;

    //to load font
    font = loadFont('/img/Slenderman.ttf');

    //To create canvas and put it in the background
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');

    //To set up the front camera on the phone
    var constraints = {
        audio: false,
        //To test on on phone, write the part with 'environment' and comment out the other part
        video: {
            facingMode: {
                exact: "environment"
            }
        }
        //video: {
        //    facingMode: "user"
        //}
    };

    video = createCapture(constraints);
    video.hide(); //by default, video is drawn. We hide it so the image is not duplicated

    //Detector
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    detector = mobilenet.classification(video, { numLabels: 8 }, videoReady); // !! by default, detector only allows 2 different items in a custom model 

    //To start game on the instructions page (first state)
    gameState = "instructions";

}

function draw() {

    if (gameState == "start") {
        image(wallpaper, 0, 0, width, height); //background
        image(video, 0, 0, video.width * height / video.height, height); //video on canvas, position, dimensions
        image(effect, 0, 0, width, height) //effect
        image(button, button_x, button_y, button_r, button_r); //Leaderboard button
      
        //For hints
        displayHints();

        if (level == 1 && label == "forest") {   //'level' ensures that pages have to be found in order
            hint = hint1; //changes text for hint
            level++; //moves to next level

            //To display miniature of image found
            let img_h = forest.height * (width - 80) / forest.width
            let y = (height - img_h) / 2;
            image(forest, 40, y, width - 80, img_h);
            
            rooms[myname].score++; //increases one point to the person that finds the page
            let data = {
                name: myname,
                gameLevel: level,
                score: rooms[myname].score
            };
            socket.emit('newWin', data); //emits new info to update all players
            
        } else if (level == 2 && label == "nonono") { //all the eight pages follow the same logic as the previous one
            hint = hint2;
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
            hint = hint3;
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
            hint = hint4;
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
            hint = hint5;
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
            hint = hint6;
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
            hint = hint7;
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

        } else if (level == 8 && label == "always watches") { //last page
            level = 0;
            hint = hint8;

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

    //gameState before 'start'. It displays instructions page
    } else if (gameState == "instructions") {

        //Background image
        image(wallpaper, 0, 0, width, height);

        //For text
        textAlign(CENTER, TOP);
        textSize(50);
        textFont(font);
        fill(180);
        text("instructions", width / 2, 120);
        textSize(25);
        fill(0);
        text(text_instructions, 0, 210, width, height);

        //When model is loaded, user can touch the screen to start playing
        if (can_start == true) {
            textSize(20);
            text("touch anywere to continue", width / 2, height - 50);
        } else if (can_start == false) {
            text("loading...", width / 2, height - 50);
        }

    //It gives information about the leaderboard and details about the match
    } else if (gameState == "help") {
        image(wallpaper, 0, 0, width, height);
        //image return button
        image(button_return, button_x, button_y, button_r, button_r);
        textFont(font);

        let message = "";
        message += "Level :" + level + "\n";
        message += "\n";
        message += myname + "\n";
        message += "\n";
        message += "Room : " + rooms[myname].room + "\n";
        message += "\n";
        message += "\n";
        message += "\n";
        message += "PLAYERS : \n";
        message += "\n";

        //To display usernames and their scores
        for (user in rooms) {
            message += user + " : " + rooms[user].score + "\n";
        }
        text(message, width / 2, 100);

    //Lose page
    } else if (gameState == "lose") {

        image(lose, 0, 0, lose.width * height / lose.height, height)
        fill(200);
        textSize(70);
        textFont(font);
        textAlign(CENTER, TOP);
        text("YOU LOST", width / 2, height / 2 + 70);

        //To add a link to the main page
        let a = createA('/', 'play again?')
        a.position(width / 2 -50, height / 2 +170);
        a.style('font-family', 'slenderman');
        a.style('color', '#d9b8b6');

    //Win page
    } else if (gameState == "win") {

        image(win, -win.width / 2, 0, win.width * height / win.height, height);
        fill(200);
        textSize(70);
        textFont(font);
        textAlign(CENTER, TOP);
        text("YOU WON", width / 2, height / 2);

                //To add a link to the main page
        let a = createA('/', 'play again?')
        a.position(width / 2-50, height / 2 + 90);
        a.style('font-family', 'slenderman');
        a.style('color', '#d9b8b6');
    }

}

//For the buttons
function touchStarted() {
    if ((gameState == "instructions") && (can_start == true)) { //to start playing when model is loaded
        gameState = "start";
    } else if (gameState == "start") {
        if ((mouseX > button_x) && (mouseX < button_x + button_r) && (mouseY > button_y) && (mouseY < button_y + button_r)) {
            gameState = "help";
        }
    } else if (gameState == "help") {
        if ((mouseX > button_x) && (mouseX < button_x + button_r) && (mouseY > button_y) && (mouseY < button_y + button_r)) {
            gameState = "start";
        }
    }
}


function displayHints() {
    //image under the hints
    let box_height = hint_box.height * width / hint_box.width
    image(hint_box, 0, height - box_height / 1.5, width, box_height);

    //To change the hints based on the level
    if (level == 1) {
        hint = hint;
    } else if (level == 2) {
        hint = hint1;
    } else if (level == 3) {
        hint = hint2;
    } else if (level == 4) {
        hint = hint3;
    } else if (level == 5) {
        hint = hint4;
    } else if (level == 6) {
        hint = hint5;
    } else if (level == 7) {
        hint = hint6;
    } else if (level == 8) {
        hint = hint7;
    }

    textFont(font);
    textSize(20);
    textAlign(CENTER, TOP);
    text(hint, 0, height - box_height / 2, width, hint_box.height);
}