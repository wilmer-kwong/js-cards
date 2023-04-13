import { 
    moveCardFromZone,
    p1_zones,
} from './zone.js';

let deck1 = p1_zones.deck_zone._listObj;

/*
let deck2 = p1_zones.deck_zone._listObj;
let gy2 = [];
let res2 = [];
let hand2 = [];
let stock2 = [];
let clock2 = [];
*/

deck1.shuffle();
p1_zones.deck_zone.render();
p1_zones.grave_zone.render();

// stage init
document.addEventListener('DOMContentLoaded', () => {
    p1_zones.stock_zone.render();
    // stock_zone_2.render();
    deck1.shuffle();
    //deck2.shuffle();
    // draw 5 cards
    for (let i = 0; i < 5; i++) {
        moveCardFromZone(p1_zones.deck_zone, p1_zones.hand_zone);
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
        for (let i = p1_zones['res_zone'].listObj.len(); i >= 0; i--) {
            moveCardFromZone(p1_zones['res_zone'], p1_zones['grave_zone'], i);
        }
    })
    // deck1 modal open
    var deckModal1 = document.getElementById('deckModal1');
    var graveModal1 = document.getElementById('graveModal1');
    document.getElementById('viewDeck1').addEventListener('click', () => {
        p1_zones.deck_modal_zone.render();
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

    // drag-drop event handlers
    addDropListeners();
});

function addDropListeners() {
    // hand listener
    document.getElementById("hand1").addEventListener("dragover", (e) => e.preventDefault());
    document.getElementById("hand1").addEventListener("drop", (e) => {
        const data = e.dataTransfer.getData("Text");
        if (data == 'deck1') moveCardFromZone(p1_zones.deck_zone, p1_zones.hand_zone);
    });

    // res listener
    document.getElementById("res1").addEventListener("dragover", (e) => e.preventDefault());
    document.getElementById("res1").addEventListener("drop", (e) => {
        const data = e.dataTransfer.getData("Text");
        if (data == 'deck1') moveCardFromZone(p1_zones.deck_zone, p1_zones.res_zone);
    });

    // level listener
    document.getElementById('level1').addEventListener('dragover', (e) => e.preventDefault());
    document.getElementById('level1').addEventListener('drop', (e) => {
        const data = e.dataTransfer.getData("Text");
        if (data == 'deck1') moveCardFromZone(p1_zones.deck_zone, p1_zones.level_zone);
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
