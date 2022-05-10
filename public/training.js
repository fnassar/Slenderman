// // Your code will go here
// // open up your console - if everything loaded properly you should see the latest ml5 version
// //console.log('ml5 version:', ml5.version)


//To change the camera https://editor.p5js.org/AndreasRef/sketches/HJVgGjmz4


let video_trained;
let mobilenet;
let classifier;

//To train each item
let page1;
let page2;
let page3;
let page4;
let page5;
let page6;
let page7;
let page8;

let trainButton;
let saveButton; 

let label = "loading model"



function gotResults(error, results){
    if (error) {
        console.error(error);
    }
    console.log(results)
    if (results[0].confidence>0.90){
        label = results[0].label;
    } else {
        label = "no object found"
    }
    classifier.classify(gotResults);
}

function modelReady() {
    console.log("model is ready")
    classifier.load("/models/model.json", customModelReady);
}

function customModelReady() {
    console.log("Custom Model is ready")
    label = "model ready";
    classifier.classify(gotResults)
}

function videoReady() {
    console.log("video is ready")
}

function whileTraining(loss){
    if(loss == null) {
        //console.log("training complete");
        fill(255);
        document.getElementById("title").innerHTML = "training complete"
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
        // video: {
        //     facingMode: {
        //         exact: "environment"
        //     }
        // }
        video: {
          facingMode: "user"
        } 
    };

    video_trained = createCapture(constraints);
    video_trained.hide();

    //COCOSD
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video_trained, {numLabels: 8} , videoReady);


    //To train ML5
    page1 = createButton('always watches');
    page1.mousePressed(function(){
        classifier.addImage('always watches');
    });

    page2 = createButton('nonono');
    page2.mousePressed(function(){
        classifier.addImage('nonono');
    });

    page3 = createButton('leave me alone');
    page3.mousePressed(function(){
        classifier.addImage('leave me alone');
    });

    page4 = createButton('dont look');
    page4.mousePressed(function(){
        classifier.addImage('dont look');
    });

    page5 = createButton('help me');
    page5.mousePressed(function(){
        classifier.addImage('help me');
    });

    page6 = createButton('follows');
    page6.mousePressed(function(){
        classifier.addImage('follows');
    });

    page7 = createButton('cant run');
    page7.mousePressed(function(){
        classifier.addImage('cant run');
    });

    page8 = createButton('forest');
    page8.mousePressed(function(){
        classifier.addImage('forest');
    });

    /////// to train and save

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
    fill(0);
    rect(20, 400, 100, 20);
    fill(255)
    text(label, 20, 400, 300, 300);
}
