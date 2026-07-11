// ========================================
// TROUVE LE JOUEUR - VERSION DFCO
// Créé par @thdu21
// ========================================

// Alphabet
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ------------------------
// Base de données (temporaire)
// ------------------------

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
}

];

// Niveau actuel

let currentPlayer = 0;

// Réponse en cours

let answer = "";

// ========================================
// Lancement du jeu
// ========================================

document
.getElementById("play-button")
.addEventListener("click",startGame);

// ========================================

function startGame(){

document
.getElementById("home-screen")
.classList.add("hidden");

document
.getElementById("game-screen")
.classList.remove("hidden");

loadPlayer();

}

// ========================================

function loadPlayer(){

const player = players[currentPlayer];

document.getElementById("level").innerHTML =
"Niveau "+(currentPlayer+1)+" / "+players.length;

document.getElementById("progress").innerHTML =
Math.round((currentPlayer/players.length)*100)+"%";

displayCareer(player);

createAnswerBoxes(player.name);

createKeyboard();

answer="";

}

// ========================================

function displayCareer(player){

const card=document.getElementById("career-card");

card.innerHTML="";

player.career.forEach(line=>{

const p=document.createElement("p");

p.innerHTML=line;

card.appendChild(p);

});

}

// ========================================

function createAnswerBoxes(name){

const answerDiv=document.getElementById("answer");

answerDiv.innerHTML="";

for(let letter of name){

const box=document.createElement("div");

if(letter===" "){

box.style.width="18px";

box.style.background="transparent";

}else{

box.className="letter-box";

}

answerDiv.appendChild(box);

}

}

// ========================================

function createKeyboard(){

const keyboard=document.getElementById("keyboard");

keyboard.innerHTML="";

alphabet.split("").forEach(letter=>{

const btn=document.createElement("button");

btn.className="key";

btn.innerHTML=letter;

btn.onclick=()=>pressLetter(letter,btn);

keyboard.appendChild(btn);

});

}

// ========================================

function pressLetter(letter,button){

button.disabled=true;

button.classList.add("used");

answer+=letter;

updateAnswer();

}

// ========================================

function updateAnswer(){

const player=players[currentPlayer];

const boxes=document.querySelectorAll(".letter-box");

let index=0;

for(let letter of player.name){

if(letter===" ") continue;

boxes[index].innerHTML=answer[index] || "";

index++;

}

checkAnswer();

}

// ========================================

function checkAnswer(){

const player=players[currentPlayer];

if(answer===player.name.replace(" ","")){

setTimeout(()=>{

alert("✅ Bravo !");

nextLevel();

},300);

}

}

// ========================================

function nextLevel(){

currentPlayer++;

if(currentPlayer>=players.length){

alert("🏆 Félicitations !");

return;

}

loadPlayer();

}

// ========================================
// INDICES
// ========================================

document.getElementById("hint-position").onclick=()=>{

alert(players[currentPlayer].position);

}

document.getElementById("hint-country").onclick=()=>{

alert(players[currentPlayer].nationality);

}

document.getElementById("hint-letter").onclick=()=>{

const name=players[currentPlayer].name.replace(" ","");

alert("Première lettre : "+name[0]);

}
