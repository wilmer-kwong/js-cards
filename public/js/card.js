export default class Card {
    constructor(value) {
        this.value = value;
    }

    // getter/setter
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }
}