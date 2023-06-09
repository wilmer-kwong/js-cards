import Card from "./card.js";

export class CardPile {
    constructor() {
        this.cards = [];
    }
    // getter/setter
    get cards() {
        return this._cards;
    }
    set cards(cards) {
        this._cards = cards;
    }
    // methods
    len() {
        return this._cards.length;
    }
    peak() {
        return this._cards[0];
    }
    peakBack() {
        return this._cards[this._cards.length-1];
    }
    splice(i) {
        return this.cards.length > 0 ? this.cards.splice(i, 1)[0] : null;
    }
    push(card) {
        this._cards.push(card);
    }
    push(card, i) {
        this._cards.splice(i, 0, card);
    }
    getCardAt(i) {
        return (i < this._cards.length) ? this.cards[i] : null;
    }
}

export class Deck extends CardPile {
    // cards[]
    constructor(numCards) {
        super();
        this.cards = this.deckInit(numCards);
    }

    deckInit(numCards) {
        let cards = new Array();
        for (let i = 1; i <= numCards; i++) {
            let card = new Card(i);
            cards.push(card);
        }
        return cards;
    }
    // methods
    shuffle() {
        const SHUFFLE_FACTOR = 1000;
        for (let i = 0; i < SHUFFLE_FACTOR; i++) {
            let i = Math.floor((Math.random() * this.cards.length));
            let j = Math.floor((Math.random() * this.cards.length));
    
            // in the extremely unlikely scenario that the two indexes
            // are the same, re-shuffle
            while (j == i) {
                j = Math.floor((Math.random() * this.cards.length));
            }
            let tmp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = tmp;
        }
    }
}
