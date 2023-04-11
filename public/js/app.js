import Deck from './deck.js';

let res1 = [];
let res2 = [];
let hand1 = [];
let hand2 = [];
let stock1 = [];
let stock2 = [];
let clock1 = [];
let clock2 = [];

// card movement functions
function deal(deck) {
    let dealtCard = deck.pop();
    if (dealtCard) {
        if (deck == deck1) {
            res1.push(dealtCard);
            renderDeck(deck);
            renderRes(res1);
        } else {
            res2.push(dealtCard);
            renderDeck(deck);
            renderRes(res2);
        }
    }
}

// to-do: little bit of boiler plate here, maybe can encapsulate
function drawCard(deck) {
    let drawnCard = deck.pop();
    if (drawnCard) {
        if (deck == deck1) {
            hand1.push(drawnCard);
            renderDeck(deck);
            renderHand(hand1);
        } else {
            hand2.push(drawnCard);
            renderDeck(deck);
            renderHand(hand2);
        }
    }
}

function resToStock(res, stock, i) {
    if (res.length > 0) {
        stock.push(res.splice(i, 1)[0]);
        renderRes(res);
        renderStock(stock);
    }
}

function resToClock(res, clock, i) {
    if (res.length > 0) {
        clock.push(res.splice(i, 1)[0]);
        renderRes(res);
        renderClock(clock);
    }
}

// render methods
function renderDeck(deck) {
    let id = (deck == deck1) ? 1 : 2;
    let deck_element = document.getElementById("deck" + id);

    deck_element.innerHTML = "";
    let card = document.createElement("div");

    // handle drag
    card.draggable = true;
    card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("Text", e.target.parentElement.id);
    })

    // handle clicks
    card.addEventListener("mouseup", (e) => checkClick(e, deck));

    if (deck.len() > 0) {
        // render just the top card
        let value = document.createElement("div");
        card.className = "card";
        card.id = deck.peak().Value;
        value.className = "value";
        value.innerHTML = deck.peak().Value;
        card.appendChild(value);
    } else {
        card.className = "empty-card";
    }
    deck_element.appendChild(card);
}

function renderRes(res) {
    let id = (res == res1) ? 1 : 2;
    let target_element = document.getElementById('res' + id);
    target_element.innerHTML = "";

    for (let i = 0; i < res.length; i++) {
        let cardWrap = document.createElement("div");
        let card = document.createElement("div");
        let value = document.createElement("div");

        // click handlers
        if (id === 1) {
            card.addEventListener("mouseup", (e) => {
                console.log(e);
                if (!e) var e = window.event;
                if (e.which == 1) {
                    resToStock(res1, stock1, i);
                } else if (e.which == 3) {
                    resToClock(res1, clock1, i);
                }
            });
        } else {
            card.addEventListener("mouseup", (e) => {
                if (!e) var e = window.event;
                if (e.which == 1) {
                    resToStock(res2, stock2, 2, i);
                } else if (e.which == 3) {
                    // to-do: resToClock();
                }
            });
        }

        cardWrap.className = "card-wrap";
        card.className = "card";
        value.className = "value";
        value.innerHTML = res[i].Value;
        card.appendChild(value);
        cardWrap.appendChild(card);
        target_element.appendChild(cardWrap);
    }
}

function renderHand(hand) {
    let id = (hand == hand1) ? 1 : 2;
    let hand_element = document.getElementById("hand" + id);
    hand_element.innerHTML = "";
    hand_element.className = "hand-" + id;

    for (let i = 0; i < hand.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        card.className = "card";
        value.className = "value";
        value.innerHTML = hand[i].Value;
        card.appendChild(value);

        hand_element.appendChild(card);
    }
}

function renderClock(clock) {
    let id = (clock == clock1) ? 1 : 2;
    let clock_element = document.getElementById("clock" + id);
    clock_element.innerHTML = "";

    for (let i = 0; i < clock.length; i++) {
        let cardWrap = document.createElement("div");
        let card = document.createElement("div");
        let value = document.createElement("div");
        cardWrap.className = "card-wrap";
        card.className = "card";
        value.className = "value";
        value.innerHTML = clock[i].Value;
        card.appendChild(value);
        cardWrap.appendChild(card);
        clock_element.appendChild(cardWrap);
    }
}

function renderStock(stock) {
    let id = (stock == stock1) ? 1 : 2;
    let stock_element = document.getElementById("stock" + id);
    stock_element.innerHTML = "";

    let card = document.createElement("div");
    
    if (stock.length > 0) {
        let value = document.createElement("div");
        card.className = "card";
        card.id = stock[stock.length-1].Value;
        value.className = "value";
        value.innerHTML = stock.length;
        card.appendChild(value);
    } else {
        card.className = "empty-card";
    }
    stock_element.appendChild(card);
}

// mouse event listeners

function checkClick(e, deck, deck_element) {
    if (!e) var e = window.event;
    if (e.which == 1) {
        drawCard(deck);
    } else if (e.which == 3) {
        deal(deck);
    }
}

function addDropListeners() {
    let hand1_element = document.getElementById("hand1");
    let hand2_element = document.getElementById("hand2");

    hand1_element.addEventListener("dragover", (e) => e.preventDefault());
    hand1_element.addEventListener("drop", (e) => {
        const data = e.dataTransfer.getData("Text");
        if (data == 'deck1') drawCard(deck1, hand1, 1);
    });

    hand2_element.addEventListener("dragover", (e) => e.preventDefault());
    hand2_element.addEventListener("drop", (e) => {
        const data = e.dataTransfer.getData("Text");
        if (data == 'deck2') drawCard(deck2, hand2, 2);
    });
}

// disable right clicks
document.addEventListener('contextmenu', e => {
    e.preventDefault();
})


// can put this all in one listener as stage init logic
let deck1 = new Deck(50);
let deck2 = new Deck(50);
document.addEventListener('DOMContentLoaded', () => {
    deck1.shuffle();
    deck2.shuffle();
    for (let i = 0; i < 5; i++) {
        drawCard(deck1);
        drawCard(deck2);
    }
    // shuffle event handlers
    document.getElementById('shuffle1').addEventListener('click', () => {
        deck1.shuffle();
        renderDeck(deck1);
    });
    document.getElementById('shuffle2').addEventListener('click', () => {
        deck2.shuffle();
        renderDeck(deck2);
    });
});
addDropListeners();
renderStock(stock1, 1);
renderStock(stock2, 2);
