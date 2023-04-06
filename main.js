res1 = [];

function getDeck() {
    let deck = new Array();
    for (let i = 0; i < 50; i++) {
        let card = {Value: (i + 1)};
        deck.push(card);
    }
    console.log(deck);
    return deck;
}

function shuffle(deck, name) {
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
    renderDeck(deck, name);
}

function deal(deck, res, name) {
    res.push(deck.shift());
    renderDeck(deck);
    renderRes(res, "res1");
}

function renderDeck(deck, name) {
    document.getElementById(name).innerHTML = "";

    // render just the top card
    let card = document.createElement("div");
    let value = document.createElement("div");
    card.className = "card";
    value.className = "value";
    value.innerHTML = deck[0].Value;
    card.appendChild(value);

    document.getElementById(name).appendChild(card);
}

function renderRes(res, name) {
    document.getElementById(name).innerHTML = "";

    for (let i = 0; i < res.length; i++) {
        let card = document.createElement("div");
        let value = document.createElement("div");
        card.className = "card";
        value.className = "value";
        value.innerHTML = res[i].Value;
        card.appendChild(value);

        document.getElementById(name).appendChild(card);
    }
}

let deck1 = getDeck();
let deck2 = getDeck();
document.addEventListener('DOMContentLoaded', renderDeck(deck1, "deck1"))
document.addEventListener('DOMContentLoaded', renderDeck(deck2, "deck2"))