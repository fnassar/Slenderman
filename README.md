# Documentation | Slenderman’s Scavenger Hunt

[_Code Link_](https://github.com/fnassar/Slenderman)</br>
[_Website Link_](https://slenderman-scavenger-hunt.glitch.me/)

[_May 6th's version_](https://pinnate-scratch-honeysuckle.glitch.me/)

## I | Description: 

_”Slenderman’s Scavenger Hunt”_ is a multiplayer online game inspired by [an Internet creepypasta from 2009](https://en.wikipedia.org/wiki/Slender_Man) with the playability of the traditional game of scavenger hunt. The website was made for mobile devices compatible with [ML5.js](https://ml5js.org/). The user enters the game’s website to see a portal where they can type a username and join a room to play with up to 5 people at the same time. Then, the user lands on the game page where they can read the instructions and start playing. During the game, the camera has to be enabled to scan the objects and get hints of their locations. 

## II | Design and evolution of the concept:

Our aim for this project was to create a mobile connected application, since it is something we hadn’t done before in this class and would certainly signify a new challenge for both of us. Comparing different mobile-friendly websites, we realized that our layout needed to be as simple and intuitive as possible. In the following image you can see the wireframe we used for our website:

<img src="/doc_Images/wireframe.png" height ="500" />

To ensure that our game was only run on phones, we stopped the website from showing sections when it was open on a screen bigger than 850px in width:
```
@media only screen and (max-width: 850px) {
```
For the landing page, we added a username and room entry to save the user’s details and let them decide which match they want to join.

<img src="/doc_Images/one.png" height ="500" />

After the user joins a room, a screen appears with the instructions while the ML5.js data loads.

<img src="/doc_Images/two.png" height ="500" />

For the game itself, the website takes input from the back camera to draw the video on the entire screen. We also added a filter on the screen to make the aesthetic match the ambience of Slenderman. The hints are displayed at the bottom of the screen and they update as the players progress through the game.

<img src="/doc_Images/five.png" height ="500" />

The button on the top right corner shows the user data and the other players’ scores.

<img src="/doc_Images/three.png" height ="500" />  <img src="/doc_Images/four.png" height ="500" />

To let the user know that a page has been scanned successfully, an image of the page found is displayed on screen.

<img src="/doc_Images/six.png" height ="500" />

We made two images for the win and lose screens. Thee winner with the highest score sees the win screen and all the others see the lose screen.

<img src="/doc_Images/seven.png" height ="500" /><img src="/doc_Images/eight.png" height ="500" />


## III | User testing:

Our game is programmed to be a one-time experience, due that the ML5.js models need to be trained and the time constraints forced us to limit our audience to people from campus. For this reason, we required users that are already familiar with the campus amenities to test our project. In the following pictures you can see professor Mathura Govindarajan from our Connections Lab class and the lab Manager and instructor of Interactive Media, Ume Hussain, helping us with the user testing:

<img src="/doc_Images/test1.jpeg" height ="300" /><img src="/doc_Images/test2.jpeg" height ="300" />

The feedback we received from their experiences was mostly positive. Something to highlight is that the playability was enjoyable and the aesthetics of the game are attractive. During the test, we found some glitches caused by the training of our ML5.js model, which we could solve in the future by taking more images of each page.

<img src="/doc_Images/test3.jpeg" height ="300" /><img src="/doc_Images/test4.jpeg" height ="300" /><img src="/doc_Images/test5.jpeg" height ="300" />

Something that professor Govindarajan mentioned was that she didn’t notice that there was a button on the top right corner and that it was not evident when one of the users finds a page. She recommended changing the design of the button and adding sound effects to fix these issues.

## IV | Next steps:

### A - Expansion Ideas: 

-To add an option to host a scavenger hunt, where the user is able to assign a room name, download the 8 pages and write their own hints for their location.

-To improve the ambiance of the website by adding more references to its theme, Slenderman. Examples of this can be adding jumpscares, background music, and more images.

-To change the design of the top right button, so the user knows it's clickable.

-To add a sound effect that lets the user know that a page has been found by them or another user.

### B - Technical ideas:

-To retrain the models and improve their accuracy.

-To fix the compatibility issues with iOS and Android, so that more users can play the game.

-To give more details about the users to offer a more personalized experience.

## V| Back End

We used sockets.io and ML5.js in the creation of this project.

#### ·Sockets.io:

-We used sockets for the back end.

-After adding the user to their own rooms, we save the user data, including name room and user score in the index.js.

-We send user data to all the players so we can update the user scores for all players in the room.

-We update the game level as well in the back end so that all users are updated at the same time.

#### ·ML5.js:

[ML5.js’ documentation](https://learn.ml5js.org/#/) and [The Coding Train’s tutorial](https://thecodingtrain.com/learning/ml5/) were necessary to understand all the library features we could use for our game. This is the list of steps followed:

-We first implemented [the Object Detection program with COCO-SD](https://thecodingtrain.com/learning/ml5/1.3-object-detection.html), to ensure that ML5.js could be run on mobile phones and with the back camera.

-Then, we used [the feature extractor classification](https://thecodingtrain.com/learning/ml5/3.1-feature-extractor-classification.html) to train the ML5.js detector with our own model.

-Finally, we moved the code to _‘training.html’_ to have an independent page where to train our models, and we added a [save button](https://www.youtube.com/watch?v=eU7gIy3xV30) to download them.

### Major problems and solutions

#### Fatema Nassar:

An error I made was not specifying the room information when sending the data, so even though the sockets worked perfectly fine, the data being sent through sockets was not specific to the room, but instead it was to all the players. We only noticed this problem the morning before the submission so we didn’t have time to fix it.

The day of testing the win lose screen did not show up as it did during testing, we are unsure about the reason but if we go further with the game we plan on checking that error before publication.

#### Andres Ugartechea:

I focused on the implementation of ML5.js for this project. Training the model was the part that took me more time to finish since I was completely new to machine learning. In our original concept, all the pages were black and white as in the original game. However, after testing in multiple conditions we decided to color each one of the pages for the game, to allow the model to detect them with more accuracy.

<img src="https://github.com/fnassar/Slenderman/blob/main/public/img/pages/alone.JPEG" height ="100" />


Another problem that I encountered was the compatibility issues with my phone. I found on a forum that [some iOS devices do not work properly with the models](https://github.com/ml5js/ml5-library/issues/383), therefore this was an issue that was out of my control. A way to solve this was to restrict our audience to Android users, but we hope in the future we can expand it to all devices.

## VI | Personal Review and thoughts: 

### [Fatema](https://github.com/fnassar):
I really enjoyed every part of this project, I mostly worked on sockets, game technicalities, and the entry page and while I had input on the game aesthetics it was mostly Andres.

While we planned a different idea at the begining, I think the fact that we endded up with a game that is mostly in person but still uses sockets as required by the class was our greatest accomplishment. 

We hope to take this project furthur which still needs more work and debugging, but we are at a pretty good place I believe

### [Andres](https://github.com/andresugartechea):


