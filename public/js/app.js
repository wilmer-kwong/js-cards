import { 
    moveCardFromZone,
    p1_zones,
} from './zone.js'
import { postMessage } from './data/chat.js'

let deck1 = p1_zones.deck_zone_1._obj;

/*
let deck2 = p1_zones.deck_zone._listObj;
let gy2 = [];
let res2 = [];
let hand2 = [];
let stock2 = [];
let clock2 = [];
*/

// stage init
document.addEventListener('DOMContentLoaded', () => {
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

    document.getElementById('send').addEventListener('click', () => {
        postMessage(document.getElementById('message').value);
    })

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
