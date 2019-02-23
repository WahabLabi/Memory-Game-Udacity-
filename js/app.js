'use strict';


const cardList = [
    'fa fa-diamond', 
    'fa fa-paper-plane-o', 
    'fa fa-anchor', 
    'fa fa-bolt', 
    'fa fa-cube', 
    'fa fa-anchor', 
    'fa fa-leaf', 
    'fa fa-bicycle', 
    'fa fa-diamond', 
    'fa fa-bomb', 
    'fa fa-leaf', 
    'fa fa-bomb', 
    'fa fa-bolt', 
    'fa fa-bicycle', 
    'fa fa-paper-plane-o', 
    'fa fa-cube'
];
const closeModal = document.querySelector('.modal__close');
const deck = document.querySelector('.deck');
const starz = document.querySelector('.stars');
const moves = document.querySelector('.moves');
const my_timer = document.querySelector('.timer');
const three = document.querySelector('.three');
const two = document.querySelector('.two');
const start_again = document.querySelector('.restart');
const play_again = document.querySelector('.button-close');
const cloak = document.querySelector('.button');


let clickedCards = [], match = [], launched = false, count = 0, secs = 0, mins = 0, hrs = 0, stars_count = 0;
let cardHtml, cardInnerHtml, cardTarget, modal, openModal, timer, shuffledCards;


// The Fisher-Yates shuffle: this algorithm shuffles the list of cards
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array; 
}


// This displays the cards on the deck
function displayCard() {
    shuffledCards = shuffle(cardList);
    for (let i = 0; i < shuffledCards.length; i++) {
        cardHtml = document.createElement('li');
        cardHtml.classList = 'card';
        deck.appendChild(cardHtml);
        cardInnerHtml = document.createElement('i');
        cardInnerHtml.classList = shuffledCards[i];
        cardHtml.appendChild(cardInnerHtml);
    }
}
window.onload = displayCard()


// Event listener - listens for a card to be clicked
function reEventListener() {
    deck.addEventListener('click', reDisplaySymbol);
}
reEventListener()


// This displays a card's symbol after it's clicked
function reDisplaySymbol() {
    cardTarget = event.target;
    if (cardTarget.classList == 'card') {
        cardTarget.classList.add('open', 'show');
        addCardToArray();
        reMoves();
        reTimz();
        starry();
    }
}


// This reveals the stars after the player' first click
function starry() {
    starz.classList.remove('invisibility');
}


// This hides the stars after the game is reset
function notstarry() {
    starz.classList.add('invisibility');
}


// This pushes a clicked card to the clickedCards array
// If clickedCards contains two cards then a check is made to see if they match and corresponding action
function addCardToArray() {
    clickedCards.push(event.target);
    if (clickedCards.length === 2) {
        if (clickedCards[0].firstChild.className === clickedCards[1].firstChild.className) {
            reMatch();
            match.push('X');
            reModal();
        } else {
            reNoMatch();
        }
    }
}


// This reveals a summary popup after all pairs are matched
function reModal() {
    modal = setTimeout(() => {
        if(match.length === 8) {
            reStopClock();
            reModalTimeMsg();
            openModal = document.querySelector('.modal');
            openModal.classList.add('visibility');
        };
    }, 2000);
}


// This closes the popup
function reCloseModal() {
    closeModal.addEventListener('click', () => {
        document.querySelector('.modal').classList.remove('visibility');
        reStartAgain();
    });
}
reCloseModal();


// This deals with a successful match
function reMatch() {
    clickedCards[0].classList.add('match');
    clickedCards[1].classList.add('match');
    clickedCards = [];
    console.log(clickedCards);
}


// This deals with an unsuccessful match
function reNoMatch() {
    clickedCards[0].classList.add('nomatch');
    clickedCards[1].classList.add('nomatch');
    deck.classList.add('freezing');
    
    setTimeout(() => {
        clickedCards[0].classList.remove('open', 'show', 'nomatch');
        clickedCards[1].classList.remove('open', 'show', 'nomatch');
        clickedCards = [];
        deck.classList.remove('freezing');
   }, 750);
}


// This displays the number of player moves
let reMoves = () => {
    moves.innerHTML = `Number of moves = ${1+count++}`;
    reStarRating();
}


// Timer
let reTimz = (() => {
    return () => {
        if(!launched) {
            launched = true;
            timer = setInterval(() => {
                secs++;
                if(secs == 1) {
                    my_timer.innerHTML = `Time elapsed = ${secs} sec`;
                }
                if(secs > 1) {
                    my_timer.innerHTML = `Time elapsed = ${secs} secs`;
                }
                if(secs == 60) {
                    secs = 0;
                    mins++;
                }
                if(mins == 1 && secs == 0) {
                    my_timer.innerHTML = `Time elapsed = ${mins} min`;
                }
                if(mins == 1 && secs == 1) {
                    my_timer.innerHTML = `Time elapsed = ${mins} min : ${secs} sec`;
                }
                if(mins == 1 && secs > 1) {
                    my_timer.innerHTML = `Time elapsed = ${mins} min : ${secs} secs`;
                }
                if(mins > 1 && secs == 0) {
                    my_timer.innerHTML = `Time elapsed = ${mins} mins`;
                }
                if(mins > 1 && secs == 1) {
                    my_timer.innerHTML = `Time elapsed = ${mins} mins : ${secs} sec`;
                }
                if(mins > 1 && secs > 1) {
                    my_timer.innerHTML = `Time elapsed = ${mins} mins : ${secs} secs`;
                }
                if(mins === 60) {
                    mins = 0;
                    hrs++;
                }
                if(hrs == 1) {
                    window.alert('The game was stopped because it was not completed within an hour');
                    reStartAgain();
                }
            }, 1000);
        }
    };
})();


// This stops the timer above
function reStopClock() {
    clearInterval(timer);
}
reStopClock()


// This deals with the player' star rating
function reStarRating() {
    if(count == 32) {
        three.classList.add('invisibility');
        stars_count = 2;
    }
    if(count == 48) {
        two.classList.add('invisibility');
        stars_count = 1;
    }
    if(count < 32) {
        stars_count = 3;
    }
}


// This restores the stars
function reRemoveStarRating() {
    three.classList.remove('invisibility');
    two.classList.remove('invisibility');
}


// Reset button
function reReset() {
    start_again.addEventListener('click', reStartAgain);
}
reReset();


// Replay button
function rePlayAgainBtn() {
    play_again.addEventListener('click', () => {
        document.querySelector('.modal').classList.remove('visibility');
        reStartAgain();
    });
}
rePlayAgainBtn();


// This resets everything
function reStartAgain() {
   deck.innerHTML = '';
   displayCard();
   clickedCards = [];
   clearInterval(timer);
   my_timer.innerHTML = 'Timer';
   moves.innerHTML = 'Number of moves';
   count = 0;
   secs = 0;
   mins = 0;
   hrs = 0;
   reRemoveStarRating();
   notstarry();
   match = [];

   (() => {
        launched = false;
        return () => {
            if(!launched) {
                launched = true;
                timer = setInterval(function() {
                    secs++;
                    if(secs === 60) {
                        secs = 0;
                        mins++;
                    }
                    if(mins === 60) {
                        mins = 0;
                        hrs++;
                    }
                }, 1000);
            }
        };
    })();
}


// After all cards have been successfully matched this provides the performance summary on the final popup
function reModalTimeMsg() {
    return  match.length === 8 && mins == 0 && secs > 0     ? document.querySelector('.popup-result').innerHTML = `You made ${count} moves in ${secs} seconds and got a ${stars_count}-star rating`
        :   match.length === 8 && mins == 1 && secs == 1    ? document.querySelector('.popup-result').innerHTML = `You made ${count} moves in ${mins} minute and ${secs} second and got a ${stars_count}-star rating`
        :   match.length === 8 && mins > 1 && secs == 1     ? document.querySelector('.popup-result').innerHTML = `You made ${count} moves in ${mins} minutes and ${secs} second and got a ${stars_count}-star rating`
        :   match.length === 8 && mins == 1 && secs > 1     ? document.querySelector('.popup-result').innerHTML = `You made ${count} moves in ${mins} minute and ${secs} seconds and got a ${stars_count}-star rating`
        :   match.length === 8 && mins == 1 && secs == 0    ? document.querySelector('.popup-result').innerHTML = `You made ${count} moves in ${mins} minute and got a ${stars_count}-star rating`
        :   match.length === 8 && mins >= 1 && secs == 0    ? document.querySelector('.popup-result').innerHTML = `You made ${count} moves in ${mins} minutes and got a ${stars_count}-star rating`
        :   match.length === 8 && mins >= 1 && secs > 0     ? document.querySelector('.popup-result').innerHTML = `You made ${count} moves in ${mins} minutes and ${secs} seconds and got a ${stars_count}-star rating`
        :   document.querySelector('.popup-result').innerHTML = '';
}

// This replaces the instructions with the star-rating, moves, timer and restart indicators after the start button is clicked
function reVisibility() {
    cloak.addEventListener('click', () => {
        document.querySelector('.disappearing').classList.add('disappear');
        document.querySelector('.score-panel').classList.remove('disappear');
    });
}
window.onload = reVisibility();
