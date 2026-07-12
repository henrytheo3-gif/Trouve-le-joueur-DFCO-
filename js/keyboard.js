/*=========================================
            KEYBOARD.JS
=========================================*/

function createKeyboard(){

    const keyboard = document.getElementById("keyboard");

    keyboard.innerHTML="";

    GameState.keyboardLetters=[];

    // Nom sans espaces
    const solution =
        GameState.currentPlayer.name.replaceAll(" ","");

    // On ajoute toutes les lettres du nom
    solution.split("").forEach(letter=>{

        GameState.keyboardLetters.push(letter);

    });

    // On complète avec des lettres aléatoires
    while(GameState.keyboardLetters.length<18){

        const random =
            ALPHABET[Math.floor(Math.random()*26)];

        GameState.keyboardLetters.push(random);

    }

    // Mélange (Fisher-Yates)

    shuffle(GameState.keyboardLetters);

    // Création des boutons

    GameState.keyboardLetters.forEach(letter=>{

        const btn=document.createElement("button");

        btn.className="key";

        btn.innerHTML=letter;

        btn.onclick=()=>pressLetter(letter,btn);

        keyboard.appendChild(btn);

    });

    // Bouton retour

    const back=document.createElement("button");

    back.className="key backspace";

    back.innerHTML="⌫";

    back.onclick=removeLetter;

    keyboard.appendChild(back);

}



//=========================

function pressLetter(letter,button){

    const solution =
        GameState.currentPlayer.name.replaceAll(" ","");

    if(GameState.answer.length>=solution.length){

        return;

    }

    GameState.answer.push(letter);

    GameState.selectedButtons.push(button);

    button.classList.add("used");

    refreshAnswer();

}



//=========================

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

}
