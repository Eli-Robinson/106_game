/*
    Here are some useful code snippets to add functionality to your projects.
*/

// ===========================================================
// COLLISION DETECTION

    //-----------------------------------------------------------
    //check collisions between box and circle 
    /*
        Simple bounding box collision detection algorithm.

        For this we need x, y, h, w for each object.
    */
    function checkCollision() {

        //setup object1 dimensions 
        var object1X = ...;
        var object1Y = ...;
        var object1W = ...;
        var object1H = ...;

        //setup object2 dimensions 
        var object2X = ...;
        var object2Y = ...;
        var object2W = ...;
        var object2H = ...;

        //check if the box is in contact with the circle
        if (object1X < object2X + object2W &&
            object1X + object1W > object2X &&
            object1Y < object2Y + object2H &&
            object1Y + object1H > object2Y) 
        {
            //---------------------------------------
            //there is a collision
            console.log("collision")

        } //if
        else 
        {
            //---------------------------------------
            //there is not a collision
            console.log("no collision")

        } //else


    } //checkCollision()


// ===========================================================
// SOUND

    //-----------------------------------------------------------
    //sound variable
    var mySound = new Audio('./audio/mySoundFile.mp3');

    //-----------------------------------------------------------
    // play a sound
    function playMySound() {
        
       //play the turkey sound
        mySound.play();
        
    }//playMySound()

    //-----------------------------------------------------------
    //play a sound based on an interval
    playMySound();


// ===========================================================
// INTERVALS

    //-----------------------------------------------------------
    //interval to play sounds
    var someIntervalOff = 0;
    var someIntervalOn = 100;
    var someInterval = someIntervalOff;

    //-----------------------------------------------------------
    //play a sound based on an interval
    if ( (frameCounter % someInterval) == 0 ) {

        //do something
    }


// ===========================================================
// Multiple Characters

    //-----------------------------------------------------------
    //define a interval to make new characters
    var newCharacterIntervalOff = 0;
    var newCharacterIntervalOn = 100;
    var newCharacterInterval = newCharacterIntervalOff;

    //-----------------------------------------------------------
    //character control variables
    
    //character dimensions
    var characterSize = 0.1;
    var characterW = 500 * characterSize;
    var characterH = 500 * characterSize;
        
    //default boundaries and booleans
    var leftBoundary = 0;
    var rightBoundary = canvasWidth - characterW;
    var topBoundary = 0;
    var bottomBoundary = canvasHeight - characterH;
    
    //an array to hold multiple characters
    var characters = [];

    // -----------------------------------------------------------
    //add a character
    function addCharacter() {

        //character starting position
        var characterStartX = ...; 
        var characterStartY = ...;  

        //character speed
        var characterMinSpeed = ...;
        var characterMaxSpeed = ...;
        var characterStartSpeed = getRandom( characterMinSpeed, characterMaxSpeed );

        //character movement
        var characterMoveX = 0; //do not move left or right
        var characterMoveY = characterStartSpeed;
        
        //set the character image index (if using images)
        var characterImageIndex = ...;
        
        //create a new character object 
        var newCharacter = {
            x: characterStartX,
            y: characterStartY,
            w: characterW,
            h: characterH,
            speed: characterStartSpeed,
            moveX: characterMoveX,
            moveY: characterMoveY,
            imageIndex: characterImageIndex
        }; //newCharacter        
        
        //add the new character object to the characters array
        characters.push( newCharacter );
                    
        //write out the number of characters in the array
        console.log( "addCharacter(): " + characters.length );
            
    } //addCharacter()
          
    //-----------------------------------------------------------
    // move the character horizontal bounce
    function moveCharacters() {

        //move the all the characters  
        for ( i = 0; i < characters.length; i++ ) {

            //-----------------------------------------------------------
            //move the character 
            characters[i].x += characters[i].moveX;
            characters[i].y += characters[i].moveY;
            
            //-----------------------------------------------------------
            //check bottom boundary
            if ( characters[i].y > bottomBoundary ) {
                //do what you want 
            }//if

            //-----------------------------------------------------------
            //check top boundary
            if ( characters[i].y < topBoundary ) {
                //do what you want 
            }//if

            //-----------------------------------------------------------
            //check left boundary
            if ( characters[i].x < leftBoundary ) {
                //do what you want 
            }//if
            
            //-----------------------------------------------------------
            //check right boundary
            if ( characters[i].x > topBoundary ) {
                //do what you want 
            }//if
            
        }//for
   
    } //moveCharacters()

   //add a new character based on an interval
    if ( (frameCounter % newCharacterInterval) == 0 ) {
        addCharacter();
    }


