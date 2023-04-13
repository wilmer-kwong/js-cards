// Zone.js
import { Deck, CardPile } from "./deck.js";

export class Zone {
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

export class DeckZone extends Zone {
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
                    moveCardFromZone(this, p1_zones['hand_zone']);
                } else if (e.button == 1) {
                    deck_modal_zone_1.render();
                    document.getElementById('deckModal1').style.display = 'flex';
                } else if (e.button == 2) {
                    moveCardFromZone(this, p1_zones['res_zone']);
                }
            });
        } else {
            card = document.createElement("div");
            card.className = "empty-card";
        }
        this._element.appendChild(card);
    }
}

export class HandZone extends Zone {
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

export class ResZone extends Zone {
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

export class StockZone extends Zone {
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

export class ClockZone extends Zone {
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

export class LevelZone extends Zone {
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

export class GraveZone extends Zone {
    constructor(listObj, element, modalElement) {
        super(listObj, element);
        this.modalElement = modalElement;
    }
    render() {
        this._element.innerHTML = "";
        let card = makeCardElement(this._listObj.peakBack());
        if (card) {
        } else {
            card = document.createElement('div');
            card.className = 'empty-card';
        }
        this._element.appendChild(card);
        card.addEventListener('click', () => {
            grave_modal_zone_1.render();
            this.modalElement.style.display = 'flex';
        })
    }
}

export class ModalZone extends Zone {
    constructor(listObj, element) {
        super(listObj, element);
    }
    render() {
        this._element.innerHTML = "";
        for (let i = 0; i < this._listObj.len(); i++) {
            let card = makeCardElement(this._listObj.getCardAt(i));
            this._element.appendChild(card);
        }
    }
}

// all of these functions above should be refactored into
// a general function: from zome -> zone.

// where a is the source zone and b is the destination zone
// no index provided, it is assumed that it is the front of the
// list being manipulated (like the top of a deck) (FIFO)
export function moveCardFromZone(a, b, i=0) {
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

export function makeCardElement(card) {
    if (!card) return null;
    let cardElement = document.createElement("div");
    let value = document.createElement("div");
    cardElement.className = "card";
    value.className = "value";
    value.innerHTML = card.value;
    cardElement.appendChild(value);
    return cardElement;
}

let deck1 = new Deck(50);
let gy1 = new CardPile();
let res1 = new CardPile();
let hand1 = new CardPile();
let stock1 = new CardPile();
let level1 = new CardPile();
let clock1 = new CardPile();

let deck_zone_1 = new DeckZone(deck1, document.getElementById('deck1'));
let deck_modal_zone_1 = new ModalZone(deck1, document.getElementById('deckModalContent1'));
let hand_zone_1 = new HandZone(hand1, document.getElementById('hand1'));
let res_zone_1 = new ResZone(res1, document.getElementById('res1'));
let stock_zone_1 = new StockZone(stock1, document.getElementById('stock1'));
let clock_zone_1 = new ClockZone(clock1, document.getElementById('clock1'));
let level_zone_1 = new LevelZone(level1, document.getElementById("level1"));
let grave_zone_1 = new GraveZone(gy1, document.getElementById('gy1'), document.getElementById('graveModal1'));
let grave_modal_zone_1 = new ModalZone(gy1, document.getElementById('graveModalContent1'));

export var p1_zones = {
    'deck_zone': deck_zone_1,
    'deck_modal_zone': deck_modal_zone_1,
    'hand_zone': hand_zone_1,
    'res_zone': res_zone_1,
    'stock_zone': stock_zone_1,
    'clock_zone': clock_zone_1,
    'level_zone': level_zone_1,
    'grave_zone': grave_zone_1,
    'grave_modal_zone': grave_modal_zone_1,
};
