import { 
    moveCardFromZone,
    p1_zones,
} from './zone.js'
import * as msgClient from './data/message.js'

class Chat {
    constructor(element) {
        this.messages = [];
        this.element = element;
    }
    // getter/setter
    get messages() {
        return this._messages;
    }
    set messages(msgs) {
        this._messages = msgs;
    }
    get element() {
        return this._element;
    }
    set element(ele) {
        this._element = ele;
    }
    // methods
    async fetchMessages() {
        this._messages = await msgClient.getMessages();
    }
    async postMessage(msg) {
        await msgClient.postMessage(msg)
        .then(await this.fetchMessages())
        .then(this.render());
    }
    render() {this._element.innerHTML = "";
        this._messages.forEach((record) => {
            let msg = document.createElement('div');
            msg.className = 'chat-msg';
            msg.innerHTML = record.message;
            this._element.appendChild(msg);
        })
    }
}


let deck1 = p1_zones.deck_zone_1._obj;
let chat = new Chat(document.getElementById('messages'));


// stage init
document.addEventListener('DOMContentLoaded', async () => {
    deck1.shuffle();
    for (let zone in p1_zones) {
        p1_zones[zone].render();
    }
    // draw 5 cards
    for (let i = 0; i < 5; i++) {
        moveCardFromZone(p1_zones.deck_zone_1, p1_zones.hand_zone_1);
    }

    // btn event handlers
    document.getElementById('shuffle1').addEventListener('click', () => {
        deck1.shuffle();
        p1_zones.deck_zone_1.render();
    });
    document.getElementById('resToWR1').addEventListener('click', () => {
        for (let i = p1_zones.res_zone_1.obj.len(); i >= 0; i--) {
            moveCardFromZone(p1_zones['res_zone_1'], p1_zones['grave_zone_1'], i, 0);
        }
    })
    // deck1 modal open
    var deckModal1 = document.getElementById('deckModal1');
    var graveModal1 = document.getElementById('graveModal1');
    document.getElementById('viewDeck1').addEventListener('click', () => {
        p1_zones.deck_modal_zone_1.render();
        deckModal1.style.display = 'flex';
    })
    // deck1 modal close
    document.getElementById('close1').addEventListener('click', () => {
        deckModal1.style.display = 'none';
    })
    // window close
    window.addEventListener('click', (e) => {
        if (e.target == deckModal1) {
            deckModal1.style.display = 'none';
        }
        if (e.target == graveModal1) {
            graveModal1.style.display = 'none';
        }
    })
    // gy1 modal close
    document.getElementById('graveClose1').addEventListener('click', () => {
        graveModal1.style.display = 'none';
    })

    document.getElementById('send').addEventListener('click', async () => {
        await chat.postMessage(document.getElementById('sendText').value);
    })

    await chat.fetchMessages();
    chat.render();

    // drag-drop event handlers
    addDropListenerToElements(p1_zones);
});

function addDropListenerToElements(zones) {
    for (let zone in zones) {
        zones[zone].element.addEventListener('dragover', (e) => e.preventDefault());
        zones[zone].element.addEventListener('drop', (e) => {
            let name = e.dataTransfer.getData('srcName');
            let index = e.dataTransfer.getData('index');
            moveCardFromZone(zones[name], zones[zone], index);
        })
    }
}

// disable right clicks
document.addEventListener('contextmenu', e => {
    e.preventDefault();
})
