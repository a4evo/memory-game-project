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
    movesDone = 0,
    restartBtnActive = false,
    leftUnmatched;

//wait while document ready
document.addEventListener("DOMContentLoaded", function (event) {

    showPopup("Welcome to Matching game", ["Start"], "start");

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

    movesDone = 0;
    updateMovesNumber();

    document.querySelector(".restart").classList.remove("unavailable");
    restartBtnActive = true;
    
    leftUnmatched = 8;

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
                    leftUnmatched --;
                    
                    if (leftUnmatched === 0) {
                        showPopup("Congratulations!", ["<i class=\"fa fa-repeat\"></i> Try again"], "finish");
                    }

                } else {

                    setTimeout(function () {
                        toggleClasses(firstCardOpened, ["open", "show"]);
                        toggleClasses(secondCardOpened, ["open", "show"]);
                        blockOpening = false;
                    }, 500);
                }

                openedCards = 0;

                movesDone++;
                updateMovesNumber();

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

function updateMovesNumber() {
    document.querySelector(".moves").textContent = movesDone;

    const stars = document.querySelector(".stars").children;

    switch (movesDone) {
        case 0:
            for (const star of stars) {
                star.classList.remove("lost-star");
            }
            break;
        case 11:
            stars[2].classList.add("lost-star");
            break;
        case 21:
            stars[1].classList.add("lost-star");
            break;
        case 31:
            stars[0].classList.add("lost-star");
            break;
    }
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
    
    if (action === "finish") {
        
        let starsRating = document.querySelector(".stars");
        
        innerContainer.appendChild(starsRating);
    }

    for (const button of buttons) {
        let newButton = document.createElement("button");
        newButton.classList.add("btn");
        newButton.insertAdjacentHTML("afterbegin", button);
        innerContainer.appendChild(newButton);
    }

    newPopup.appendChild(innerContainer);


    document.querySelector("body").appendChild(newPopup);

    //add event listeners for buttons
    const btns = document.querySelectorAll(".btn");

    for (const btn of btns) {
        addEventListenersToBtns(btn, action);
    }
}

function addEventListenersToBtns(btn, action) {

    btn.addEventListener("click", function (event) {

        const userAnswer = event.target.textContent;
        console.log(userAnswer);
        if (userAnswer !== "no") {
            document.querySelector('.deck').remove();
            createDeck();
        } 

        document.querySelector(".popup-new").remove();
    });
}
