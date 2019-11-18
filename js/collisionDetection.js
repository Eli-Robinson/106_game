/*
    collisionDetection.js
*/

/* ************************************************************* */
//When the page has fully loaded, execute the eventWindowLoaded function
window.addEventListener("load", eventWindowLoaded, false);

/* ************************************************************* */
//eventWindowLoaded()
//Called when the window has been loaded it then calls the canvasapp() 
function eventWindowLoaded() {
    canvasApp();
} // eventWindowLoaded()

/* ************************************************************* */
//canvasSupport() 
//Check for Canvas Support using modernizr.js
function canvasSupport() {
    return Modernizr.canvas;
} // canvasSupport()

/* ************************************************************* */
//canvasApp() 
//The function where ALL our canvas code will go
function canvasApp() {

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Support */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    //Check to see if the canvas has a context 
    if (!canvasSupport()) {
        return;
    } //if 

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Utility Functions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    // -----------------------------------------------------------
    //function for getting a random number with in a range	
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    } //getRandom

    // -----------------------------------------------------------
    //function randomize the circle color
    function getRandomColor() {
        //do not be complete completely transparent
        var opacity = getRandom(3, 10) / 10;

        return "rgba(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + "," + opacity + ")";
    } //randomColor()

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Variables */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    //Setup the canvas object
    var theCanvas = document.getElementById("myCanvas"); //get the canvas element
    var context = theCanvas.getContext("2d"); //get the context
    var canvasHeight = theCanvas.height; //get the heigth of the canvas
    var canvasWidth = theCanvas.width; //get the width of the canvas
    var canvasColor = "#EAF2E3"; //starting bg color

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Object Variables */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

   