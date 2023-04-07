let eDeck1 = document.getElementById("deck1");
let eDeck2 = document.getElementById("deck2");
let hand1_element = document.getElementById("hand1");
let hand2_element = document.getElementById("hand2");
let res1_element = document.getElementById("res1");
let res2_element = document.getElementById("res2");

res1 = [];
res2 = [];
hand1 = [];
hand2 = [];
stock1 = [];
stock2 = [];

function getDeck() {
    let deck = new Array();
    for (let i = 0; i < 50; i++) {
        let card = {Value: (i + 1)};
        deck.push(card);
    }
    return deck;
}

function shuffle(deck, id) {
    const SHUFFLE_FACTOR = 1000;
    for (let i = 0; i < SHUFFLE_FACTOR; i++) {
        let i = Math.floor((Math.random() * deck.length));
        let j = Math.floor((Math.random() * deck.length));

        // in the extremely unlikely scenario that the two indexes
        // are the same, re-shuffle
        while (j == i) {
            j = Math.floor((Math.random() * deck.length));
        }
        let tmp = deck[i];
        deck[i] = deck[j];
        deck[j] = tmp;
    }
    renderDeck(deck, id);
}

// card movement functions

function deal(deck, res, id) {
    if (deck.length > 0) {
        res.push(deck.shift());
        renderDeck(deck, id);
        renderRes(res, id);
    }
}

// to-do: little bit of boiler plate here, maybe can encapsulate
function drawCard(deck, hand, id) {
    if (deck.length > 0) {
        hand.push(deck.shift());
        renderDeck(deck, id);
        renderHand(hand, id);
    }
}

function resToStock(res, stock, id, i) {
    if (res.length > 0) {
        stock.push(res.splice(i, 1)[0]);
        renderRes(res, id);
        renderStock(stock, id);
    }
}

// render methods

function renderDeck(deck, id) {
    document.getElementById('deck' + id).innerHTML = "";
    let card = document.createElement("div");

    // handle drag
    card.draggable = true;
    card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("Text", e.target.parentElement.id);
    })

    // handle clicks
    if (id === 1) {
        card.addEventListener("mouseup", (e) => checkClick(e, deck1, res1, hand1, 1));
    } else {
        card.addEventListener("mouseup", (e) => checkClick(e, deck2, res2, hand2, 2));
    }
   
    if (deck.length > 0) {
        // render just the top card
        let value = document.createElement("div");
        card.className = "card";
        card.id = deck[0].Value;
        value.className = "value";
        value.innerHTML = deck[0].Value;
        card.appendChild(value);
    } else {
        card.className = "empty-card";
    }
    document.getElementById('deck' + id).appendChild(card);
}

function renderRes(res, id) {
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
                    resToStock(res1, stock1, 1, i);
                } else if (e.which == 3) {
                    // to-do: resToClock();
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

function renderHand(hand, id) {
    let hand_element = document.getElementById("hand" + id);
    hand_element.innerHTML = "";
    hand_element.className = "hand";

    for (i = 0; i < hand.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        card.className = "card";
        value.className = "value";
        value.innerHTML = hand[i].Value;
        card.appendChild(value);

        hand_element.appendChild(card);
    }

}

function renderStock(stock, id) {
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

function checkClick(e, deck, res, hand, id) {
    if (!e) var e = window.event;
    if (e.which == 1) {
        drawCard(deck, hand, id);
    } else if (e.which == 3) {
        deal(deck, res, id);
    }
}

function addDropListeners() {
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
let deck1 = getDeck();
let deck2 = getDeck();
document.addEventListener('DOMContentLoaded', shuffle(deck1, 1));
document.addEventListener('DOMContentLoaded', shuffle(deck2, 2));
document.addEventListener('DOMContentLoaded', renderHand(hand1, 1));
document.addEventListener('DOMContentLoaded', renderHand(hand2, 2));
addDropListeners();
renderStock(stock1, 1);
renderStock(stock2, 2);
for (let i = 0; i < 5; i++) {
    drawCard(deck1, hand1, 1);
    drawCard(deck2, hand2, 2);
}