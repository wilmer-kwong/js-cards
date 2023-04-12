import { CardPile, Deck } from './deck.js';

class Zone {
    constructor(listObj, element) {
        this.listObj = listObj;
        this.element = element;
    }
    // getter/setter
    get element() {
        return this._element;
    }
    set element(element) {
        this._element = element;
    }
    get listObj() {
        return this._listObj;
    }
    set listObj(listObj) {
        this._listObj = listObj;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
}

class DeckZone extends Zone {
    constructor(listObj, element) {
        super(listObj, element)
    }
    render() {
        this._element.innerHTML = "";
        let card = makeCardElement(this._listObj.peak());
        if (card) {
            // handle drag
            card.draggable = true;
            card.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("Text", e.target.parentElement.id);
            })
            // handle clicks
            card.addEventListener("mouseup", (e) => {
                if (!e) var e = window.event;
                if (e.button == 0) {
                    moveCardFromZone(this, p1_zones['hand-zone']);
                } else if (e.button == 2) {
                    moveCardFromZone(this, p1_zones['res-zone']);
                }
            });
        } else {
            card = document.createElement("div");
            card.className = "empty-card";
        }
        this._element.appendChild(card);
    }
}

class HandZone extends Zone {
    constructor(listObj, element) {
        super(listObj, element)
    }
    render() {
        this._element.innerHTML = "";
        for (let i = 0; i < this._listObj.len(); i++) {
            let card = makeCardElement(this._listObj.getCardAt(i));
            this._element.appendChild(card);
        }
    }
}

class ResZone extends Zone {
    constructor(listObj, element) {
        super(listObj, element);
    }
    render() {
        this._element.innerHTML = "";
        for (let i = 0; i < this._listObj.len(); i++) {
            let card_wrap = document.createElement("div");
            card_wrap.className = "card-wrap";
            let card = makeCardElement(this._listObj.getCardAt(i));

            // click handlers
            card.addEventListener('mouseup', (e) => {
                if (!e) var e = window.event;
                if (e.button == 0) moveCardFromZone(this, p1_zones['stock_zone'], i);
                else moveCardFromZone(this, p1_zones['clock_zone'], i);
            })

            card_wrap.appendChild(card);
            this._element.appendChild(card_wrap);
        }
    }
}

class StockZone extends Zone {
    constructor(listObj, element) {
        super(listObj, element);
    }
    render() {
        this._element.innerHTML = "";
        let card;
        if (this._listObj.len() > 0) {
            card = makeCardElement(this._listObj.getCardAt(this._listObj.len() - 1));
            card.children[0].innerHTML = this._listObj.len();
        } else {
            card = document.createElement("div");
            card.className = "empty-card";
        }
        this._element.appendChild(card);
    }
}

class ClockZone extends Zone {
    constructor(listObj, element) {
        super(listObj, element);
    }
    render() {
        // to-do: this card wrap rendering is repeated, could
        // be encapsulated if u can apply handlers after
        // appending the child.

        // if u can: you can have all these extend the same
        // zone type and then overload a 'setHandlers' function.
        this._element.innerHTML = "";
        for (let i = 0; i < this._listObj.len(); i++) {
            let card_wrap = document.createElement("div");
            card_wrap.className = 'card-wrap';
            let card = makeCardElement(this._listObj.getCardAt(i));

            // click handlers

            card_wrap.appendChild(card);
            this._element.appendChild(card_wrap);
        }
    }
}

class LevelZone extends Zone {
    constructor(listObj, element) {
        super(listObj, element);
    }
    render() {
        this._element.innerHTML = "";
        for (let i = 0; i < this._listObj.len(); i++) {
            let card_wrap = document.createElement("div");
            card_wrap.className = 'card-wrap';
            let card = makeCardElement(this._listObj.getCardAt(i));

            // click handlers

            card_wrap.appendChild(card);
            this._element.appendChild(card_wrap);
        }
    }
}

class GraveZone extends Zone {
    constructor(listObj, element) {
        super(listObj, element);
    }
    render() {
        this._element.innerHTML = "";
        let card = makeCardElement(this._listObj.peakBack());
        if (card) {
            //
        } else {
            card = document.createElement('div');
            card.className = 'empty-card';
        }
        this._element.appendChild(card);
    }
}

let deck1 = new Deck(50);
let deck2 = new Deck(50);
let gy1 = new CardPile();
let gy2 = [];
let res1 = new CardPile();
let res2 = [];
let hand1 = new CardPile();
let hand2 = [];
let stock1 = new CardPile();
let stock2 = [];
let level1 = new CardPile();
let clock1 = new CardPile();
let clock2 = [];

let deckZone1 = new DeckZone(deck1, document.getElementById('deck1'));
let hand_zone_1 = new HandZone(hand1, document.getElementById('hand1'));
let res_zone_1 = new ResZone(res1, document.getElementById('res1'));
let stock_zone_1 = new StockZone(stock1, document.getElementById('stock1'));
let clock_zone_1 = new ClockZone(clock1, document.getElementById('clock1'));
let level_zone_1 = new LevelZone(level1, document.getElementById("level1"));
let grave_zone_1 = new GraveZone(gy1, document.getElementById('gy1'));

var p1_zones = {
    'hand-zone': hand_zone_1,
    'res-zone': res_zone_1,
    'stock_zone': stock_zone_1,
    'clock_zone': clock_zone_1,
    'level_zone': level_zone_1,
    'grave_zone': grave_zone_1,
};

deck1.shuffle();
deckZone1.render();
grave_zone_1.render();

// stage init
document.addEventListener('DOMContentLoaded', () => {
    stock_zone_1.render();
    // stock_zone_2.render();
    deck1.shuffle();
    deck2.shuffle();
    // draw 5 cards
    for (let i = 0; i < 5; i++) {
        moveCardFromZone(deckZone1, hand_zone_1);
        //drawCard(deck2);
    }

    // btn event handlers
    document.getElementById('shuffle1').addEventListener('click', () => {
        deck1.shuffle();
        deckZone1.render();
    });
    document.getElementById('shuffle2').addEventListener('click', () => {
        deck2.shuffle();
        renderDeck(deck2);
    });
    document.getElementById('resToWR1').addEventListener('click', () => {
        for (let i = p1_zones['res-zone'].listObj.len(); i >= 0; i--) {
            moveCardFromZone(p1_zones['res-zone'], p1_zones['grave_zone'], i);
        }
    })

    // drag-drop event handlers
    addDropListeners();
});

// all of these functions above should be refactored into
// a general function: from zome -> zone.

// where a is the source zone and b is the destination zone
// no index provided, it is assumed that it is the front of the
// list being manipulated (like the top of a deck) (FIFO)
function moveCardFromZone(a, b, i=0) {
    // check if the source has cards to move
    if (a.listObj.len() > 0) {
        let card = a.listObj.splice(i);
        if (card) {
            b.listObj.push(card)
            a.render();
            b.render();
        }
    }
}

function makeCardElement(card) {
    if (!card) return null;
    let cardElement = document.createElement("div");
    let value = document.createElement("div");
    cardElement.className = "card";
    value.className = "value";
    value.innerHTML = card.value;
    cardElement.appendChild(value);
    return cardElement;
}

function addDropListeners() {
    // hand listener
    document.getElementById("hand1").addEventListener("dragover", (e) => e.preventDefault());
    document.getElementById("hand1").addEventListener("drop", (e) => {
        const data = e.dataTransfer.getData("Text");
        if (data == 'deck1') moveCardFromZone(deckZone1, hand_zone_1);
    });

    // res listener
    document.getElementById("res1").addEventListener("dragover", (e) => e.preventDefault());
    document.getElementById("res1").addEventListener("drop", (e) => {
        const data = e.dataTransfer.getData("Text");
        if (data == 'deck1') moveCardFromZone(deckZone1, res_zone_1);
    });

    // level listener
    document.getElementById('level1').addEventListener('dragover', (e) => e.preventDefault());
    document.getElementById('level1').addEventListener('drop', (e) => {
        const data = e.dataTransfer.getData("Text");
        if (data == 'deck1') moveCardFromZone(deckZone1, level_zone_1);
    })

    /* second player handlers
    hand2_element.addEventListener("dragover", (e) => e.preventDefault());
    hand2_element.addEventListener("drop", (e) => {
        const data = e.dataTransfer.getData("Text");
        if (data == 'deck2') drawCard(deck2, hand2, 2);
    });
    */
}

// disable right clicks
document.addEventListener('contextmenu', e => {
    e.preventDefault();
})
