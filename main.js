// https://youtu.be/Fhd-suIxTFU



//Clicked cards' values
let firstCard  = null;
let secondCard = null;
let timer      = null;

let count  = 0;
let numOfClickedCards = 0;
let $clock = document.getElementById("clock");
let $field = document.getElementById("field");

let timer2 = setInterval( function() {
    $clock.innerText = "Time-lapse: " + (++count) + " seconds";//Count will increase by second
}, 1000 );


//Store a pair of cards
let cards = [
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", 
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", 
];


//Create a random integer (from min to max)
function random ( min, max ) {
    return Math.floor( Math.random() * (max-min+1) ) + min;
};


//Shuffle cards (Fisher–Yates shuffle)
function shuffleCards () {
    for ( let i = cards.length - 1; 0 < i; i-- ) {
        let randomNum = random( 0, i );//e.g.: If a card is the last of cards[], pick a random index from 0 to i inclusive
        let temporaryCard = cards[ i ];//e.g.: In the above example, it's "K"
        cards[ i ] = cards[ randomNum ];//e.g.: Swap "K" with the card at the random index
        cards[ randomNum ] = temporaryCard;//e.g.: "K" is placed where the randomly selected card were.
    };
};





//Process once a user clicks a card
function click ( e ) {
    
    //If a user click the next card while the timer is set, the two clicked cards will be judged right away
    if ( timer ) {
        clearTimeout( timer );
        judge();
    }
    
    let elm = e.target;//The clicked card
    elm.innerHTML = cards[ elm.index ];//Turn up the clicked card
    
    if ( !firstCard ) {
        //If a user didn't select any card yet, the clicked card is the first card.
        firstCard = elm;
        
    } else if ( firstCard.index == elm.index ) {
        //If a user selected the same card two times, exit if() loop
        return;
        
    } else {
        //If a user selected the different two cards
        secondCard = elm;//The second card is the newly clicked card
        timer = setTimeout( judge, 1000 );//Judge the clicked cards a second later
        
    }
}


//Check if the two clicked cards are the same number
function judge () {   
    
    if ( firstCard.innerHTML == secondCard.innerHTML ) {
        //If the clicked cards are the same, make them invisible not to be selected any more
        firstCard.style.visibility  = "hidden";
        secondCard.style.visibility = "hidden";
        numOfClickedCards += 2;
        
        //If only two cards are left, timer2 will be stopped
        if ( numOfClickedCards == cards.length ) {
            clearInterval( timer2 );
        }
    } else {
        //Otherwise, turn down the clicked cards for the next turn
        firstCard.innerHTML  = "";
        secondCard.innerHTML = "";
        
        //If a user fails to find the same card, the timer will be progressed by 5 seconds as a penalty 
        count += 5;
    }
    
    //Clear the first and second card and the timer for the next turn
    firstCard  = null;
    secondCard = null;
    timer      = null;
    
}


//Draw cards image as HTML
function drawCards () {
    for ( let i = 0; i < cards.length; i++ ) {
        let element = document.createElement("div");//Create a new div element
        
        element.className = "card";//Add the text node to the newly created div
        element.innerHTML = "";//Turn down all cards
        element.index     = i;//Store cards number as "index"
        element.onclick   = click;//Call the following click() function once a user clicks a card
        
        $field.appendChild( element );
    }
}


shuffleCards();
drawCards();