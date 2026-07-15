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

// 1. On déclare la variable qui va accueillir les données du JSON
let players = [];

// Chargement de la page et des données
window.onload = async () => {
    // On cache le bouton de jeu le temps de charger les données pour éviter les bugs
    const playButton = document.getElementById("play-button");
    if (playButton) playButton.style.display = "none";

    try {
        // 2. Récupération du fichier players.json
        const response = await fetch("./players.json");
        
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement du fichier JSON : ${response.status}`);
        }
        
        players = await response.json();
        
        // Une fois les données chargées, on réactive le jeu
        loadProgress();
        
        if (playButton) {
            playButton.style.display = "block"; // Ou "inline-block" selon votre CSS
            playButton.addEventListener("click", startGame);
        }

    } catch (error) {
        console.error("Impossible de charger les joueurs :", error);
        alert("Erreur technique : impossible de charger la liste des joueurs.");
    }
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
