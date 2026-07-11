/*=========================================
            GAME.JS
=========================================*/

// Affiche la carrière

function displayCareer(){

    const card = document.getElementById("career-card");

    card.innerHTML = "";

    const career = GameState.currentPlayer.career;

    for(let i=0;i<GameState.revealedClubs;i++){

        if(career[i]){

            const line = document.createElement("div");

            line.className="career-line";

            line.innerHTML=career[i];

            card.appendChild(line);

        }

    }

    // Bouton + si tous les clubs ne sont pas encore affichés

    if(GameState.revealedClubs < career.length){

        const btn = document.createElement("button");

        btn.id="more-clubs";

        btn.innerHTML="➕ Révéler un club";

        btn.onclick=revealClub;

        card.appendChild(btn);

    }

}



//==============================

// Affiche un club supplémentaire

//==============================

function revealClub(){

    GameState.revealedClubs++;

    displayCareer();

}



//==============================

// Création des cases réponse

//==============================

function createAnswerBoxes(){

    const answer=document.getElementById("answer");

    answer.innerHTML="";

    const name=GameState.currentPlayer.name;

    for(let letter of name){

        if(letter===" "){

            const space=document.createElement("div");

            space.className="space";

            answer.appendChild(space);

        }

        else{

            const box=document.createElement("div");

            box.className="letter-box";

            box.dataset.letter=letter;

            box.innerHTML="";

            answer.appendChild(box);

        }

    }

}



//==============================

// Remplit les cases

//==============================

function refreshAnswer(){

    const boxes=document.querySelectorAll(".letter-box");

    boxes.forEach(box=>box.innerHTML="");

    for(let i=0;i<GameState.answer.length;i++){

        boxes[i].innerHTML=GameState.answer[i];

    }

    checkVictory();

}



//==============================

// Efface la dernière lettre

//==============================

function removeLetter(){

    if(GameState.answer.length===0) return;

    const lastButton=

        GameState.selectedButtons.pop();

    if(lastButton){

        lastButton.classList.remove("used");

    }

    GameState.answer.pop();

    refreshAnswer();

}



//==============================

// Vérifie la victoire

//==============================

function checkVictory(){

    const solution=

        GameState.currentPlayer.name

        .replaceAll(" ","");

    if(GameState.answer.join("")===solution){

        setTimeout(()=>{

            victory();

        },500);

    }

}



//==============================

// Niveau réussi

//==============================

function victory(){

    saveProgress();

    alert("🎉 Bravo !");

    GameState.currentLevel++;

    if(GameState.currentLevel>=players.length){

        alert("🏆 Félicitations ! Tu as terminé la démo !");

        return;

    }

    loadLevel();

}
