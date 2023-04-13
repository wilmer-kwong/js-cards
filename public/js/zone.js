// ListZone.js
import { Deck, CardPile } from "./deck.js";

export class ListZone {
    constructor(obj, element) {
        this.obj = obj;
        this.element = element;
    }
    // getter/setter
    get element() {
        return this._element;
    }
    set element(element) {
        this._element = element;
    }
    get obj() {
        return this._obj;
    }
    set obj(obj) {
        this._obj = obj;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    makeDraggable(card, name) {
        card.draggable = true;
        card.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData('srcName', name);
        })
    }
}

export class QueueZone extends ListZone {
    constructor(obj, element) {
        super(obj, element);
    }
    // renders then returns the top card
    render() {
        this._element.innerHTML = "";
        let card = makeCardElement(this._obj.peak());
        if (card) {
            super.makeDraggable(card, this._element.id);
        } else {
            card = document.createElement('div');
            card.className = 'empty-card';
        }
        this._element.appendChild(card);
        return card;
    }
}

export class DeckZone extends QueueZone {
    constructor(obj, element) {
        super(obj, element)
    }
    render() {
        let card = super.render();
        super.makeDraggable(card, this._element.id);
        // handle clicks
        card.addEventListener("mouseup", (e) => {
            if (!e) var e = window.event;
            if (e.button == 0) {
                moveCardFromZone(this, p1_zones['hand_zone_1']);
            } else if (e.button == 1) {
                deck_modal_zone_1.render();
                document.getElementById('deckModal1').style.display = 'flex';
            } else if (e.button == 2) {
                moveCardFromZone(this, p1_zones['res_zone_1']);
            }
        });
    }
}

export class HandZone extends ListZone {
    constructor(obj, element) {
        super(obj, element)
    }
    render() {
        this._element.innerHTML = "";
        for (let i = 0; i < this._obj.len(); i++) {
            let card = makeCardElement(this._obj.getCardAt(i));
            this._element.appendChild(card);
        }
    }
}

export class ResZone extends ListZone {
    constructor(obj, element) {
        super(obj, element);
    }
    render() {
        this._element.innerHTML = "";
        for (let i = 0; i < this._obj.len(); i++) {
            let card_wrap = document.createElement("div");
            card_wrap.className = "card-wrap";
            let card = makeCardElement(this._obj.getCardAt(i));

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

export class StockZone extends ListZone {
    constructor(obj, element) {
        super(obj, element);
    }
    render() {
        this._element.innerHTML = "";
        let card;
        if (this._obj.len() > 0) {
            card = makeCardElement(this._obj.getCardAt(this._obj.len() - 1));
            card.children[0].innerHTML = this._obj.len();
        } else {
            card = document.createElement("div");
            card.className = "empty-card";
        }
        this._element.appendChild(card);
    }
}

export class ClockZone extends ListZone {
    constructor(obj, element) {
        super(obj, element);
    }
    render() {
        // to-do: this card wrap rendering is repeated, could
        // be encapsulated if u can apply handlers after
        // appending the child.

        // if u can: you can have all these extend the same
        // zone type and then overload a 'setHandlers' function.
        this._element.innerHTML = "";
        for (let i = 0; i < this._obj.len(); i++) {
            let card_wrap = document.createElement("div");
            card_wrap.className = 'card-wrap';
            let card = makeCardElement(this._obj.getCardAt(i));

            // click handlers

            card_wrap.appendChild(card);
            this._element.appendChild(card_wrap);
        }
    }
}

export class LevelZone extends ListZone {
    constructor(obj, element) {
        super(obj, element);
    }
    render() {
        this._element.innerHTML = "";
        for (let i = 0; i < this._obj.len(); i++) {
            let card_wrap = document.createElement("div");
            card_wrap.className = 'card-wrap';
            let card = makeCardElement(this._obj.getCardAt(i));

            // click handlers

            card_wrap.appendChild(card);
            this._element.appendChild(card_wrap);
        }
    }
}

export class GraveZone extends QueueZone {
    constructor(obj, element, modalElement) {
        super(obj, element);
        this.modalElement = modalElement;
    }
    render() {
        let card = super.render();
        card.addEventListener('click', () => {
            grave_modal_zone_1.render();
            this.modalElement.style.display = 'flex';
        })
    }
}

export class ModalZone extends ListZone {
    constructor(obj, element) {
        super(obj, element);
    }
    render() {
        this._element.innerHTML = "";
        for (let i = 0; i < this._obj.len(); i++) {
            let card = makeCardElement(this._obj.getCardAt(i));
            this._element.appendChild(card);
        }
    }
}

// all of these functions above should be refactored into
// a general function: from zome -> zone.

// where a is the source zone and b is the destination zone
// no index provided, it is assumed that it is the front of the
// list being manipulated (like the top of a deck) (FIFO)
export function moveCardFromZone(a, b, i=0, j=b.obj.len()) {
    // check if the source has cards to move
    if (a.obj.len() > 0) {
        let card = a.obj.splice(i);
        if (card) {
            b.obj.push(card, j)
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
let center1_1 = new CardPile();
let center1_2 = new CardPile();
let center1_3 = new CardPile();
let back1_1 = new CardPile();
let back1_2 = new CardPile();

let deck_zone_1 = new DeckZone(deck1, document.getElementById('deck_zone_1'));
let deck_modal_zone_1 = new ModalZone(deck1, document.getElementById('deck_modal_zone_1'));
let hand_zone_1 = new HandZone(hand1, document.getElementById('hand_zone_1'));
let res_zone_1 = new ResZone(res1, document.getElementById('res_zone_1'));
let stock_zone_1 = new StockZone(stock1, document.getElementById('stock_zone_1'));
let clock_zone_1 = new ClockZone(clock1, document.getElementById('clock_zone_1'));
let level_zone_1 = new LevelZone(level1, document.getElementById("level_zone_1"));
let grave_zone_1 = new GraveZone(gy1, document.getElementById('grave_zone_1'), document.getElementById('grave_modal_zone_1'));
let grave_modal_zone_1 = new ModalZone(gy1, document.getElementById('grave_modal_zone_1'));
let center_zone_1_1 = new QueueZone(center1_1, document.getElementById('center_zone_1_1'));
let center_zone_1_2 = new QueueZone(center1_2, document.getElementById('center_zone_1_2'));
let center_zone_1_3 = new QueueZone(center1_3, document.getElementById('center_zone_1_3'));
let back_zone_1_1 = new QueueZone(back1_1, document.getElementById('back_zone_1_1'));
let back_zone_1_2 = new QueueZone(back1_2, document.getElementById('back_zone_1_2'));

// ejs ids
var p1_element_ids = [
    'deck_zone_1',
    'deck_modal_zone_1',
    'hand_zone_1',
    'res_zone_1',
    'stock_zone_1',
    'clock_zone_1',
    'level_zone_1',
    'grave_zone_1',
    'grave_modal_zone_1',
    'center_zone_1_1',
    'center_zone_1_2',
    'center_zone_1_3',
    'back_zone_1_1',
    'back_zone_1_2'
];

// zone references
var p1_zone_objs = [
    deck_zone_1,
    deck_modal_zone_1,
    hand_zone_1,
    res_zone_1,
    stock_zone_1,
    clock_zone_1,
    level_zone_1,
    grave_zone_1,
    grave_modal_zone_1,
    center_zone_1_1,
    center_zone_1_2,
    center_zone_1_3,
    back_zone_1_1,
    back_zone_1_2
];

function zip(keys, values) {
    let obj = {};
    keys.forEach((k, i) => {
        obj[k] = values[i];
    })
    console.log(obj);
    return obj;
}

// coressponding with their ejs ids
export var p1_zones = zip(p1_element_ids, p1_zone_objs);