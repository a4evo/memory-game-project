/*
 * Create a list that holds all of your cards
 */

let cardsList = ["fa-diamond",
                 "fa-paper-plane-o",
                 "fa-anchor",
                 "fa-bolt",
                 "fa-cube",
                 "fa-leaf",
                 "fa-bicycle",
                 "fa-bomb",
                 "fa-diamond",
                 "fa-paper-plane-o",
                 "fa-anchor",
                 "fa-bolt",
                 "fa-cube",
                 "fa-leaf",
                 "fa-bicycle",
                 "fa-bomb"],
  openedCards = 0;

//wait while document ready
document.addEventListener("DOMContentLoaded", function (event) {
  //console.log("DOM fully loaded and parsed");

  /*
   * event listener for start button
   */

  document.querySelector(".start-button").addEventListener("click", function () {
    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */

    createDeck();

    //hide cover window
    document.querySelector(".popup").classList.add("hidden");


  });

  /*
   *event listener for restart
   */

  document.querySelector(".restart").addEventListener("click", function () {

    //TODO popup question if player sure
    let seriously = true;

    //if true
    if (seriously) {
      document.querySelector(".deck").remove();
      createDeck();
    }

    //TODO if false close popup

  });

  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */



});

//Function creating deck
function createDeck() {

  let shuffledCards = shuffle(cardsList);

  const newDeck = document.createElement("ul");
  newDeck.classList.add("deck");

  for (let card of shuffledCards) {
    let newCard = `<li class="card"><i class="fa ${card}"></i></li>`;
    newDeck.insertAdjacentHTML('beforeend', newCard);
  }

  //append deck
  document.querySelector(".container").appendChild(newDeck);

  document.querySelector(".deck").addEventListener("click", function (event) {
    if (event.target.nodeName == 'LI') {
      console.log(event.target);
    }
  });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
