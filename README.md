# Documentation | Slenderman’s Scavenger Hunt

[_Code Link_](https://github.com/fnassar/Slenderman)</br>
[_Website Link_](https://slenderman-scavenger-hunt.glitch.me/)

[_May 6th's version_](https://pinnate-scratch-honeysuckle.glitch.me/)

## I | Description: 

_”Slenderman’s Scavenger Hunt”_ is a multiplayer online game inspired by [an Internet creepypasta from 2009](https://en.wikipedia.org/wiki/Slender_Man) with the playability of the traditional game of scavenger hunt. The website was made for mobile devices compatible with [ML5.js](https://ml5js.org/). The user enters the game’s website to see a portal where they can type a username and join a room to play with up to 5 people at the same time. Then, the user lands on the game page where they can read the instructions and start playing. During the game, the camera has to be enabled to scan the objects and get hints of their locations. 

## II | Design and Wireframe:

- Our game is designed for phones, so we stopped the website from showing sections when it was open on a screen bigger than 850px in width.
- For the entry page, we used a simple room number and name entry which we used to save the user details and decade which room for the user to join the room they prefer.

<img src="/doc_Images/one.png" height ="500" />

- We added a loading screen with instructions while the ml5 data was loading ater the user enters the game.

<img src="/doc_Images/two.png" height ="500" />

- For the game itself, we added a button on top to show the user data and other players scores.

<img src="/doc_Images/three.png" height ="500" />  <img src="/doc_Images/four.png" height ="500" />

- We used a filter on the camera to make the aesthetic match the vibe of the slenderman
- We added the next hint messages on the bottom of the screen, they update as the users progresse through the game.

<img src="/doc_Images/five.png" height ="500" />

- We displayed the image found when it was scanned for the user to know that the object was scanned

<img src="/doc_Images/six.png" height ="500" />

- We made two images for the win and lose screens, the winner with the highest score sees the win screen and all the others see the losing screen

<img src="/doc_Images/seven.png" height ="500" /><img src="/doc_Images/eight.png" height ="500" />

## III | User testing:
_These are some images we took of the players while user testing_

<img src="/doc_Images/test1.jpeg" height ="300" /><img src="/doc_Images/test2.jpeg" height ="300" /><img src="/doc_Images/test3.jpeg" height ="300" /><img src="/doc_Images/test4.jpeg" height ="300" /><img src="/doc_Images/test5.jpeg" height ="300" />

## III | Next steps:

### A - Expansion Ideas: 

- To add an option to host a scavenger hunt, where the user is able to assign a room name, download the 8 pages and write their own hints for their location.
- To improve the ambience of the website by adding more references to its theme, Slenderman. Examples of this can be to add jumpscares, background music, and more images.
- To add a sound effect that lets the user know that a page has been found by them or another user.

### B - Technical ideas:

- To fix the compatibility issues with iOS and Android, so more users can play the game.
- To give more details about the users to offer a more personalized experience.

## IV| Back End

- We used sockets for the back end 
- After adding the user to their own rooms we save the user data, including name room and user score in the index.js 
- We send user data to all the players so we can update the user scores for all players in the room.
- We update the game level as well in the back end so that all users are updated at the same time.

### Errors 

An error I made was not specifying the room information when sending the data, so even though the sockets worked perfectly fine, the data being sent through sockets was not specific to the room, but instead it was to all the players. We only noticed this problem the morning before the submission so we didn’t have time to fix it.
The day of testing the win lose screen did not show up as it did during testing, we are unsure about the reason but if we go further with the game we plan on checking that error before publication.

## VI| Personal Review and thoughts: 
### Fatema:
I really enjoyed every part of this project, I mostly worked on sockets, game technicalities, and the entry page and while I had input on the game aesthetics it was mostly [Andres](https://github.com/andresugartechea).

While we planned a different idea at the begining, I think the fact that we endded up with a game that is mostly in person but still uses sockets as required by the class was our greatest accomplishment. 

We hope to take this project furthur which still needs more work and debugging, but we are at a pretty good place I believe

### Andres:


