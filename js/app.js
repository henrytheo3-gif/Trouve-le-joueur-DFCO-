/*=========================================
 TROUVE LE JOUEUR - VERSION DFCO
 Créé par @thdu21
=========================================*/

// Alphabet utilisé
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Etat du jeu
const GameState = {

    currentLevel: 0,

    currentPlayer: null,

    revealedClubs: 2,

    answer: [],

    selectedButtons: [],

    keyboardLetters: []

};

// Base de données (temporaire)

const players = [

{
    name:"JULIO TAVARES",

    position:"Attaquant",

    nationality:"🇨🇻 Cap-Vert",

    career:[
        "2008-2012 | FC Bourg-Péronnas",
        "2012-2020 | Dijon FCO",
        "2020-2022 | Al Faisaly",
        "2022-2024 | Al Raed",
        "2024-2025 | Al-Dira FC",
        "2025- | Dijon FCO"
    ]
},

{
    name:"JORDAN MARIE",

    position:"Milieu",

    nationality:"🇫🇷 France",

    career:[
        "2011- | Dijon FCO"
    ]
}

];

// Chargement de la page

window.onload = () => {

    loadProgress();

    document
    .getElementById("play-button")
    .addEventListener("click",startGame);

}

//==============================

function startGame(){

    document
    .getElementById("home-screen")
    .classList.add("hidden");

    document
    .getElementById("game-screen")
    .classList.remove("hidden");

    loadLevel();

}

//==============================

function loadLevel(){

    GameState.currentPlayer =
        players[GameState.currentLevel];

    GameState.answer=[];

    GameState.selectedButtons=[];

    GameState.revealedClubs=2;

    updateTopBar();

    displayCareer();

    createAnswerBoxes();

    createKeyboard();

}

//==============================

function updateTopBar(){

    document
    .getElementById("level")
    .innerHTML=
    "Niveau "
    +(GameState.currentLevel+1)
    +" / "
    +players.length;

    document
    .getElementById("progress")
    .innerHTML=
    Math.round(
        (GameState.currentLevel/players.length)*100
    )+"%";

}
