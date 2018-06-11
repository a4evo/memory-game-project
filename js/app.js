/*
 * Create a list that holds all of your cards and other common variables
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
openedCards = 0,
firstCardOpened = "",
blockOpening = false,
restartBtnActive = false;

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
    
    if (!restartBtnActive) {
        return;
    }
      showPopup("Are you sure?", ["yes", "no"], "restart");
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
  document.querySelector(".restart").classList.remove("unavailable");
  restartBtnActive = true;

  document.querySelector(".deck").addEventListener("click", function (event) {

    isOpened = event.target.classList.contains("open");
    isMatched = event.target.classList.contains("match");

    if (event.target.nodeName == 'LI' && !isOpened && !isMatched && !blockOpening) {
      //console.log(openedCards);

      if (openedCards === 0) {

        firstCardOpened = event.target;
        toggleClasses(event.target, ["open", "show"]);
        openedCards++;

      } else if (openedCards === 1) {
        blockOpening = true;
        const secondCardOpened = event.target;
        toggleClasses(secondCardOpened, ["open", "show"]);

        if (firstCardOpened.firstElementChild.className == secondCardOpened.firstElementChild.className) {

          toggleClasses(firstCardOpened, ["match", "open", "show"]);
          toggleClasses(secondCardOpened, ["match", "open", "show"]);
          blockOpening = false;

        } else {
          
          setTimeout(function () {
            toggleClasses(firstCardOpened, ["open", "show"]);
            toggleClasses(secondCardOpened, ["open", "show"]);
            blockOpening = false;
          }, 800);
        }

        openedCards = 0;

      }
    }
  });
}

//function toggling classes from array
function toggleClasses(target, classes = []) {
  for (let className of classes) {
    target.classList.toggle(className);
  }
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


//Create pop-up window with message and buttons

function showPopup(message, buttons, action) {
  
    let newPopup = document.createElement("div");
    newPopup.classList.add("popup-new");

    let innerContainer = document.createElement("div");
    innerContainer.classList.add("popup-inner");

    let title = document.createElement("h1");
    title.insertAdjacentHTML('afterbegin', message);
    innerContainer.appendChild(title);

    for (const button of buttons) {
        let newButton = document.createElement("button");
        newButton.classList.add("btn");
        newButton.insertAdjacentHTML("afterbegin", button );
        innerContainer.appendChild(newButton);
    }

    newPopup.appendChild(innerContainer);


    document.querySelector("body").appendChild(newPopup);
  
    //add event listeners for buttons
    const btns = document.querySelectorAll(".btn");
        
    for(const btn of btns) {
       addEventListenersToBtns(btn, action);        
    }
}

function addEventListenersToBtns (btn, action) {
    
    btn.addEventListener("click", function(event){
        
        const userAnswer = event.target.textContent;
        console.log(userAnswer);
        if (action === "restart" && userAnswer === "yes") {
            document.querySelector('.deck').remove();
            createDeck();
        }
        
        document.querySelector(".popup-new").remove();        
    });
}