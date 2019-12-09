/*
    fpStarter.js
*/

//When the page has fully loaded, execute the eventWindowLoaded function
window.addEventListener("load", eventWindowLoaded, false);

//-----------------------------------------------------------
//eventWindowLoaded()
//Called when the window has been loaded it then calls the canvasapp() 
function eventWindowLoaded() {
    canvasApp();
} // eventWindowLoaded()

//-----------------------------------------------------------
//canvasSupport() 
//Check for Canvas Support using modernizr.js
function canvasSupport() {
    return Modernizr.canvas;
} // canvasSupport()

//-----------------------------------------------------------
//canvasApp() 
//The function where ALL our canvas code will go
function canvasApp() {

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Support */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    //Check to see if the canvas has a context 
    if (!canvasSupport()) {
        return; //Canvas not supported so exit the function
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Utility Functions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    // -----------------------------------------------------------
    //function for getting a random number with in a range	
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    } //getRandom

    // -----------------------------------------------------------
    //function randomize the color
    function getRandomColor() {
        //do not be complete completely transparent
        var opacity = getRandom(3, 10) / 10;

        return "rgba(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + "," + opacity + ")";
    } //randomColor()

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Image Utility Variables and Functions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    // declare an array to hold the image objects
    var images = [];

    // declare an array for image sources and assign the image sources
    var imageSources = [   
        //bg Image
        "./images/bgImage.jpg",
        "./images/matrix-neo.png",
        "./images/UpArrow.png",
        "./images/DownArrow.png",
        "./images/RightArrow.png",
        "./images/LeftArrow.png"
    ]; //imageSource    

    // Image Index Location Variables
    var bgImageIndex = 0;
    var neoImageIndex = 1;
    var upArrowIndex = 2;
    var downArrowIndex = 3;
    var rightArrowIndex = 4;
    var leftArrowIndex = 5;
  
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // create and load image objects into an array 
    // based on an image source array
    function loadImages(images, imageSources, callback) {
        var loadedImages = 0;

        //- - - - - - - - - - - - - - - - - - - - -
        // for each imageSource
        for (var src = 0; src < imageSources.length; src++) {

            //- - - - - - - - - - - - - - - - - - - - -
            //create a new image object
            images[src] = new Image();

            //- - - - - - - - - - - - - - - - - - - - -
            //load the image 
            images[src].onload = function () {
                    if (++loadedImages >= imageSources.length) {
                        callback(images);
                    }; //if
                } //onload()

            //- - - - - - - - - - - - - - - - - - - - -
            //set the image source
            images[src].src = imageSources[src];

        } //for

    } //loadimages()

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Variables */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    //Setup the canvas object
    var theCanvas = document.getElementById("myCanvas"); //get the canvas element
    var context = theCanvas.getContext("2d"); //get the context
    var canvasHeight = theCanvas.height; //get the heigth of the canvas
    var canvasWidth = theCanvas.width; //get the width of the canvas
    var canvasColor = "rgba(0, 0, 0, 1)"; // set the default canvas bg color

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Game Control Variables */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    // Start Game 
    var gameOn = false;
    var gameOver = false;
    var stopInterval = 2500;

    //-----------------------------------------------------------
    // Frame Counter
    var frameCounter = 0;

    //-----------------------------------------------------------
    // Intervals
    // ...put any intervals ...

    //-----------------------------------------------------------
    // Score Counters 
    // ...put hit, miss, lives counters here ...

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Sound Object Variables and Functions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    //sound variables

    //audio object
    var SciFiSound = new Audio('./audio/ComputerSciFi.mp3');

    //interval to play sounds
    var soundIntervalOff = 0;
    var soundIntervalOn = 100;
    var soundInterval = soundIntervalOff;

    //-----------------------------------------------------------
    // play a  sound
    function playSciFiSound() {
        
       //play the SciFiSound sound
        SciFiSound.play();
        
    }//playSciFiSound()    
    
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Object Variables and Functions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //put your any object functions here...see the Neo object as an example
    
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Neo Variables and Functions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    //-----------------------------------------------------------
    /* Arrow variables */
    var arrows = [];
    var createRate = 8;
    var counter = 0;
    var arrowType = -1;

    var speed = 6;

    // scale the actual image size to the display size

    var upArrowW = 150;
    var upArrowH = 150;

    var downArrowW = 150;
    var downArrowH = 150;

    var rightArrowW = 150;
    var rightArrowH = 150;

    var leftArrowW = 150;
    var leftArrowH = 150;

    // start at the right part of canvas
    var upStartX = 2*canvasWidth/5-upArrowW/2;
    var upStartY = 0;

    var downStartX = 3* canvasWidth/5-upArrowW/2;
    var downStartY = 0;

    var rightStartX = 4* canvasWidth/5-upArrowW/2;
    var rightStartY = 0;

    var leftStartX = canvasWidth/5-upArrowW/2;
    var leftStartY = 0;

    //define arrow object

    var up = {
        x: upStartX,
        y: upStartY,
        w: upArrowW,
        h: upArrowH,
        imgIndex: upArrowIndex
    };

    var down = {
        x: downStartX,
        y: downStartY,
        w: downArrowW,
        h: downArrowH,
        imgIndex: downArrowIndex
    };

    var right = {
        x: rightStartX,
        y: rightStartY,
        w: rightArrowW,
        h: rightArrowH,
        imgIndex: rightArrowIndex
    };

    var left = {
        x: leftStartX,
        y: leftStartY,
        w: leftArrowW,
        h: leftArrowH,
        imgIndex: leftArrowIndex
    };



    //-----------------------------------------------------------
    /* Neo variables */
    
    // scale the actual image size to the display size
    var neoImageW = 512 * .5;
    var neoImageH = 512 * .5;
    
    // start in the middle of the canvas
    var neoStartX = canvasWidth/2 - neoImageW/2;
    var neoStartY = canvasHeight/2 - neoImageH/2;
    
    //define the neo object with the starting values
    var neo = {
        x: neoStartX,
        y: neoStartY,
        w: neoImageW,
        h: neoImageH,
        imgIndex: neoImageIndex
    };

    //-----------------------------------------------------------
    // draw the moving arrows and create new arrows
    function moveArrows() {
        //draws new arrows to canvas
        if(frameCounter%createRate === 0){
            arrowType = getRandom(0, 4);
            if(arrowType === 0){
                var up = {
                    x: upStartX,
                    y: upStartY,
                    w: upArrowW,
                    h: upArrowH,
                    imgIndex: upArrowIndex
                };
                arrows.push(up);
            } else if(arrowType === 1){
                var down = {
                    x: downStartX,
                    y: downStartY,
                    w: downArrowW,
                    h: downArrowH,
                    imgIndex: downArrowIndex
                };
                arrows.push(down);
            } else if (arrowType === 2){
                var right = {
                    x: rightStartX,
                    y: rightStartY,
                    w: rightArrowW,
                    h: rightArrowH,
                    imgIndex: rightArrowIndex
                };
                arrows.push(right);
            } else {
                var left = {
                    x: leftStartX,
                    y: leftStartY,
                    w: leftArrowW,
                    h: leftArrowH,
                    imgIndex: leftArrowIndex
                };
                arrows.push(left);
            }
        }
        //moves the arrows and deletes used arrows
        for(var i=0; i<arrows.length; i++) {
            arrows[i].y += speed;
            if (arrows[i].y > canvasHeight) {
                arrows.splice(i, 1);
            }
        }
        //draws the arrows to the canvas
        for(var j=0; j<arrows.length; j++) {
            context.drawImage(images[arrows[j].imgIndex], arrows[j].x, arrows[j].y, arrows[j].w, arrows[j].h)
        }

    }
    //-----------------------------------------------------------
    // check hitboxed on buttonPress
    //-----------------------------------------------------------
    // draw the Neo Image in a new random location
    function drawNeoImage() {

        //set a random location
        neo.x = getRandom( 0, canvasWidth - neoImageW );
        neo.y = getRandom( 0, canvasHeight - neoImageH );
        
        //draw the neo image
        context.drawImage(images[neo.imgIndex], neo.x, neo.y, neo.w, neo.w);

    } //drawNeoImage()

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Message and Image functions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    // draw the BG Image
    function drawBGImage() {

        //draw the bg image to fill the canvas
        context.drawImage(images[bgImageIndex], 0, 0, canvasWidth, canvasHeight);

    } //drawBGImage()

    //-----------------------------------------------------------
    // clear canvas
    function clearCanvas() {

        // set a fill style of white
        context.fillStyle = canvasColor;

        // fill the while canvas with the fill style
        context.fillRect(0, 0, canvasWidth, canvasHeight);

    } //clearCanvas()

    //-----------------------------------------------------------
    // function to write the frame counter to the canvas and HTML page
    function writeCounters() {

        //build the frame counter message
        var message = "Frame: " + frameCounter;

        //write the frame counter on the canvas
        context.fillStyle = "white";
        context.font = "30px Orbitron";
        context.fillText(message, 10, 50);

        //write the frame counter on the HTML page
        document.getElementById("documentMessage").innerHTML = message;

    } //writeCounters()


    //-----------------------------------------------------------
    // function start screen
    function writeStartScreen() {

        //build the frame counter message
        var message = "Click Yeet To Beat My Meat" ;

        //write the frame counter on the canvas
        context.fillStyle = "white";
        context.font = "30px Orbitron";
        context.fillText(message, 200, 500);

        //write the frame counter on the HTML page
        document.getElementById("documentMessage").innerHTML = message;

    } //writeStartScreen()
    
    //-----------------------------------------------------------
    //write the End Screen
    function writeGameOver() {

        //to build message strings
        var message;

        //clear the canvas
        clearCanvas();

        //draw the neo image at its last postion
        context.drawImage(images[neo.imgIndex], neo.x, neo.y, neo.w, neo.w);

        //font color
        context.fillStyle = "white";

        //message
        message = "Game Over";
        context.font = "60px Orbitron";
        context.fillText(message, 125, 60);
        
        //message
        var message = "Click to Try Again";
        context.font = "42px Orbitron";        
        context.fillText(message, 100, 390);
        
        //write the frame counter on the HTML page
        document.getElementById("documentMessage").innerHTML = message;
        
    } //writeGameOver()

    //-----------------------------------------------------------
    //draw the canvas
    function drawCanvas() {

        //--------------------------------------------
        //1. clear and setup the canvas
        clearCanvas();
        //draw the bg image
        // drawBGImage();

        //--------------------------------------------
        //2. move, change any objects


        //--------------------------------------------
        //3. draw any objects (the arrows)
        moveArrows();
        //draw the Neo image
        // drawNeoImage();

        
        //--------------------------------------------
        //4. check for collisions        

        
        //--------------------------------------------
        //5. write any counters

        //write the counters
        writeCounters();
        
    } //drawCanvas()
    
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Event Listeners & Handlers */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    //listen for a click on the canvas
    theCanvas.addEventListener("click", eventMouseClickCanvas);
    
    //-----------------------------------------------------------
    //listener for a click on the startButton and call setStartGame
    startButton.addEventListener( "click", eventMouseClickCanvas );

    //-----------------------------------------------------------
    //start the game when the mouse is clicked
    function eventMouseClickCanvas(e) {

        //start the game

        startGame();

    } //eventMouseClick()

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Game Loop */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    
    //-----------------------------------------------------------
    // start game setup function
    function startGame() {
        
        console.log( "startGame" );

        //reset the gameOn and gameOver flags
        gameOn = true;
        gameOver = false;
        
        //reset the counters
        frameCounter = 0;
        
    } // startGame()
    
    //-----------------------------------------------------------
    // check if the game is over
    function checkGameOver() {
        
        //if frameCounter is > stopInterval then the game is over
        if ( frameCounter > stopInterval ) {
            
            // game is over
            gameOver = true;
            
            // and game on is false
            gameOn = false;
            
        } //if
        
    } // checkGameOver()
    
    // -----------------------------------------------------------
    // the game loop
    function gameLoop() {
        
        //get the next animation frame
        requestAnimationFrame(gameLoop);
        
        //if the game is On
        if ( gameOn === true ) {
        
            //increment the frame counter
            frameCounter++;
        
            //play a sound based on an interval
            // if ( (frameCounter % soundInterval) == 0 ) {
            //     playSciFiSound();
            // }//if
            
            //check if the game is over
            checkGameOver();

            //if the game is not over
            if ( gameOver === false ) {
                
                //play the game
                drawCanvas();

            }//if the game is over
            else {

                //draw the game over screen
                writeGameOver();

            }//else

            
        }//if gameOn
        
        
    } //gameLoop()

    // -----------------------------------------------------------
    // do any setup
    frameCounter = 0;

    // -----------------------------------------------------------
    //load the images and then call gameLoop()
    loadImages(images, imageSources, function (images) {
        
        //setup
        writeStartScreen();

        //call game loop
        gameLoop();

    });

   
} //canvasApp()