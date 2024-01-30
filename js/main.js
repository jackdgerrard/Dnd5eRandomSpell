//unused for now
let min = 0;
//maximum number for the roll
let maxForRoll = 318;
//URL for all spells
const BASE_URL = "https://www.dnd5eapi.co/api/";
let AllSpells = [];

function rollDice() {
  let Roll = Math.floor(Math.random() * maxForRoll);
  let spellIndex = AllSpells[Roll];
  console.log("clicked, got: ", Roll);
  console.log(spellIndex)
  document.getElementById("diceBox").innerHTML = Roll;
  //fetch spell with index 'Roll' from Spells

}

function FetchSpecificSpell(urlstring, spellIndex) {
  fetch(urlstring+"Spells" + spellIndex)
  .then;
}



window.onload = function getAllSpells(urlsting) {
 
  fetch(BASE_URL+"Spells")
  .then((response) => response.json())
  .then(data => AllSpells.push(...data.results));

  console.log("all spells", AllSpells)

  /*for (spell in AllSpells) {
    window.sessionStorage.set(spell[1], spell[0]);
    console.log("set spell")
  }
  */

  //assign functions to buttons
  document
    .getElementById("getRandomSpellButton")
    .addEventListener("click", rollDice);

    //just so we know
    console.log("ready to roll");
};
