//This code is based on The Coding Train's tutorial on feature extractor classification: https://thecodingtrain.com/learning/ml5/3.1-feature-extractor-classification.html

//For the detector and model trainer
let video_trained;
let mobilenet_1;
let classifier;

//Buttons train each item
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

//To read the objects detected and the accuracy
let label = "loading model"
let confidence_value = 0.95;


function gotResults(error, results){
    if (error) {
        console.error(error);
    }
    if (results[0].confidence>confidence_value){
        label = results[0].label + " " + confidence_value
    } else {
        label = "no object found" + " " + confidence_value
    }
    classifier.classify(gotResults);
}

function modelReady() {
    console.log("model is ready")
    classifier.load("/models/model.json", customModelReady); //uses trained model
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
        fill(255);
        document.getElementById("title").innerHTML = "training complete" //notifies the user when the model has been trained
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

    //For classifier
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    classifier = mobilenet.classification(video_trained, {numLabels: 8} , videoReady);

    //Buttons to train ML5
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


    //To finish training and save model
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

    //rectangles are drawn as background for the texts, to read them easier
    fill(0);
    rect(20, 400, 100, 20);
    fill(255)
    text(label, 20, 400, 300, 300);
    rect(0, height-50, 50, 50);
    rect(width-50, height-50, 50, 50);
}

function touchStarted(){
    //Used to create 'buttons' to test different confident_values
    if ((mouseX<50)&&(mouseX>0)&&(mouseY<height)&&(mouseY>height-50)){
        confidence_value -= 0.01;
    }
    if ((mouseX<width)&&(mouseX>width-50)&&(mouseY<height)&&(mouseY>height-50)){
        confidence_value += 0.01;
    }
}

