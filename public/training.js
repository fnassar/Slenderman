// // Your code will go here
// // open up your console - if everything loaded properly you should see the latest ml5 version
// //console.log('ml5 version:', ml5.version);


//To change the camera https://editor.p5js.org/AndreasRef/sketches/HJVgGjmz4


let video_trained;
let mobilenet;
let classifier;

//To train each item
let itemButton;
let item2Button;
let trainButton;
let saveButton; 



function gotResults(error, results){
    if (error) {
        console.error(error);
    }
    console.log(results)
    classifier.classify(gotResults);
}

function modelReady() {
    console.log("model is ready")
}

function videoReady() {
    console.log("video is ready")
}

function whileTraining(loss){
    if(loss == null) {
        console.log("training complete");
        classifier.classify(gotResults)
    }
}

function setup() {
    //to create canvas and put it in the background
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');

    //to set up the front camera on the phone
    var constraints = {
        audio: false,

        ///TO TEST ON PHONE, COMMENT IN THIS PART AND COMMENT OUT THE OTHER ONE 
        video: {
            facingMode: {
                exact: "environment"
            }
        }
        // video: {
        //   facingMode: "user"
        // } 
    };

    video_trained = createCapture(constraints);
    video_trained.hide();

    //COCOSD
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video_trained, videoReady);


    //To train ML5
    itemButton = createButton('happy');
    itemButton.mousePressed(function(){
        classifier.addImage('happy');
    });

    item2Button = createButton('sad');
    item2Button.mousePressed(function(){
        classifier.addImage('sad');
    });

    trainButton = createButton('train');
    trainButton.mousePressed(function(){
        classifier.train(whileTraining);
    });

    saveButton = createButton('save');
    saveButton.mousePressed(function(){
        classifier.save();
    });
}

function draw() {
    background(255, 0, 0);
    image(video_trained, 0, 0, video_trained.width, video_trained.height); //video on canvas, position, dimensions
}
