/*=========================================
            HINTS.JS
=========================================*/

// Nombre d'indices utilisés
GameState.hintsUsed = 0;

//==================================
// Création de la zone d'information
//==================================

function showHint(message){

    let box = document.getElementById("hint-box");

    if(!box){

        box = document.createElement("div");

        box.id = "hint-box";

        document
            .getElementById("game-screen")
            .appendChild(box);

    }

    box.innerHTML = message;

    box.classList.add("visible");

    setTimeout(()=>{

        box.classList.remove("visible");

    },3000);

}

//==================================
// Révéler une lettre
//==================================

document
.getElementById("hint-letter")
.onclick = revealLetter;

function revealLetter(){

    const solution =
        GameState.currentPlayer.name.replaceAll(" ","");

    // Première case vide
    let index = GameState.answer.length;

    if(index >= solution.length){

        return;

    }

    const expectedLetter = solution[index];

    // Cherche le bouton correspondant encore disponible
    const buttons =
        document.querySelectorAll(".key");

    buttons.forEach(button=>{

        if(
            button.innerHTML===expectedLetter &&
            !button.classList.contains("used")
        ){

            pressLetter(expectedLetter,button);

            return;

        }

    });

    GameState.hintsUsed++;

}

//==================================
// Poste
//==================================

document
.getElementById("hint-position")
.onclick = ()=>{

    GameState.hintsUsed++;

    showHint(
        "⚽ Poste : "
        +GameState.currentPlayer.position
    );

};

//==================================
// Nationalité
//==================================

document
.getElementById("hint-country")
.onclick = ()=>{

    GameState.hintsUsed++;

    showHint(
        "🌍 "
        +GameState.currentPlayer.nationality
    );

};
