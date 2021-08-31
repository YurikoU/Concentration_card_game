// https://youtu.be/Fhd-suIxTFU



//Store a pair of cards
let cards = [
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", 
    "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", 
];

let $field = document.getElementById("field");

for ( let i = 0; i < cards.length; i++ ) {
    let element = document.createElement("div");

    element.className = "card";//Add class name
    element.innerHTML = cards[ i ];//Set the text
    element.index     = i;

    $field.appendChild( element );
}