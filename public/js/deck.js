import Card from "./card.js";

export default class Deck {
    // cards[]
    constructor(numCards) {
        this.cards = this.deckInit(numCards);
    }

    deckInit(numCards) {
        let cards = new Array();
        for (let i = 0; i < numCards; i++) {
            let card = new Card(i);
            cards.push(card);
        }
        return cards;
    }

    // getter
    get cards() {
        return this._cards;
    }

    set cards(newCards) {
        this._cards = newCards;
    }

    len() {
        return this._cards.length;
    }

    peak() {
        return this._cards[0];
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

    pop() {
        return this.cards.length > 0 ? this.cards.shift() : null;
    }
}
