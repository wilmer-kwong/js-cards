let eDeck1 = document.getElementById("deck1");
let eDeck2 = document.getElementById("deck2");

res1 = [];
res2 = [];
hand1 = [];
hand2 = [];

function getDeck() {
    let deck = new Array();
    for (let i = 0; i < 50; i++) {
        let card = {Value: (i + 1)};
        deck.push(card);
    }
    console.log(deck);
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

function renderDeck(deck, id) {
    document.getElementById('deck' + id).innerHTML = "";
    let card = document.createElement("div");

    if (deck.length > 0) {
        // render just the top card
        let value = document.createElement("div");
        card.className = "card";
        value.className = "value";
        value.innerHTML = deck[0].Value;
        card.appendChild(value);
    } else {
        card.className = "empty-card";
    }
    document.getElementById('deck' + id).appendChild(card);

}

function renderRes(res, id) {
    document.getElementById('res' + id).innerHTML = "";

    for (let i = 0; i < res.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        card.className = "card";
        value.className = "value";
        value.innerHTML = res[i].Value;
        card.appendChild(value);

        document.getElementById('res' + id).appendChild(card);
    }
}

function renderHand(hand, id) {
    document.getElementById("hand" + id).innerHTML = "";
    document.getElementById("hand" + id).className = "hand";

    for (i = 0; i < hand.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        card.className = "card";
        value.className = "value";
        value.innerHTML = hand[i].Value;
        card.appendChild(value);

        document.getElementById('hand' + id).appendChild(card);
    }

}

function checkClick(e, deck, res, hand, id) {
    if (!e) var e = window.event;
    if (e.which == 1) {
        drawCard(deck, hand, id);
    } else if (e.which == 3) {
        deal(deck, res, id);
    }
}

// disable right clicks

document.addEventListener('contextmenu', e => {
    e.preventDefault();
})


let deck1 = getDeck();
let deck2 = getDeck();
shuffle(deck1, 1);
shuffle(deck2, 2);
document.addEventListener('DOMContentLoaded', renderDeck(deck1, 1))
document.addEventListener('DOMContentLoaded', renderDeck(deck2, 2))

eDeck1.addEventListener("mouseup", (event) => checkClick(event, deck1, res1, hand1, 1));
eDeck2.addEventListener("mouseup", (event) => checkClick(event, deck2, res2, hand2, 2));