
// -----------------------------------------------------------
// Intervals
// 1.  add the variable at the top with the other variables
// 2.  add the function in the set with the other circle functions
// 3.  call the function in gameLoop()
// -----------------------------------------------------------

//-----------------------------------------------------------
// define a interval  
var addInterval = 100;

//-----------------------------------------------------------
// add a circle the character 
function addCircle() {

    //add new circle based on a change inverval
    if ( (frameCounter % addInterval) == 0 ){

        //add a new circle
        genCircle();

    } //if

} //addCircle()


// -----------------------------------------------------------
// SOUND 
// 1.  add the sound variable at the top with the other variables
// 2.  call the mySound.play()() when you want the sound played
// -----------------------------------------------------------

// -----------------------------------------------------------
// Sound Variables
var mySound = new Audio("foldername/filename.ext");

// -----------------------------------------------------------
// Play Sound 
mySound.play();


// -----------------------------------------------------------
// Hit Boxes for Collision
// 1. add this right above the if statement in the CD function

//draw hit boxes
context.setLineDash([2, 2]);
context.strokeStyle = "red";
context.rect( object1X, object1Y, object1W, object1H );
context.rect( object2X, object2Y, object2W, object2H );
context.stroke();














