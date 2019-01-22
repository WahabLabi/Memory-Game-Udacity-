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

let clickedCards = [];
let match = [];

let cardHtml;
let cardInnerHtml;
let cardTarget;
let modal;
let openModal;
let timer;
let shuffledCards;
let launched = false;

let count = 0;
let secs = 0;
let mins = 0;
let hrs = 0;
let stars_count = 0;

const closeModal = document.querySelector('.modal__close');
const deck = document.querySelector('.deck');
const starz = document.querySelector('.stars');
const moves = document.querySelector('.moves');
const my_timer = document.querySelector('.timer');
const three = document.querySelector('.three');
const two = document.querySelector('.two');
const start_again = document.querySelector('.restart');
const play_again = document.querySelector('.button-close');


//shuffle the list of cards using the provided "shuffle" method below
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

//Display the cards on the page - loop through each card and create its HTML - add each card's HTML to the page
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


//set up the event listener for a card.
function reEventListener() {
    deck.addEventListener('click', reDisplaySymbol);
}
reEventListener()


//display the card's symbol
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


function starry() {
    starz.classList.remove('invisibility');
}


function notstarry() {
    starz.classList.add('invisibility');
}


//add the card to a *list* of "open" cards
//if the list already has another card, check to see if the two cards match
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


function reCloseModal() {
    closeModal.addEventListener('click', () => {
        document.querySelector('.modal').classList.remove('visibility');
        reStartAgain();
    });
}
reCloseModal();


//if the cards do match, lock the cards in the open position
function reMatch() {
    clickedCards[0].classList.add('match');
    clickedCards[1].classList.add('match');
    clickedCards = [];
    console.log(clickedCards);
}


//if the cards do not match, remove the cards from the list and hide the card's symbol
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


//increment the move counter and display it on the page
let reMoves = () => {
    moves.innerHTML = `Number of moves = ${1+count++}`;
    reStarRating();
}


//timer
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


function reStopClock() {
    clearInterval(timer);
}
reStopClock()


//star rating
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


function reRemoveStarRating() {
    three.classList.remove('invisibility');
    two.classList.remove('invisibility');
}


//reset button
function reReset() {
    start_again.addEventListener('click', reStartAgain);
}
reReset();


//replay button
function rePlayAgainBtn() {
    play_again.addEventListener('click', () => {
        document.querySelector('.modal').classList.remove('visibility');
        reStartAgain();
    });
}
rePlayAgainBtn();


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


//if all cards have matched, display a message with the final score
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
