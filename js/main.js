//unused for now
let min = 0;
//maximum number for the roll
let maxForRoll = 318;
//URL for all spells
const BASE_URL = "https://www.dnd5eapi.co/api/";

//contains all spells once fetched from API
let AllSpells = [];

//Contains one spell
let ChosenSpell = ["not", "picked", "yet"];

function rollDice() {
  let Roll = Math.floor(Math.random() * maxForRoll);
  ChosenSpell = AllSpells[Roll];

  console.log("clicked, got: ", Roll);
  document.getElementById("diceBox").innerHTML = Roll;
  document.getElementById("SpellBox0").innerHTML =
    "<h2>" + ChosenSpell.name + "</h2>";

  FetchSpecificSpell(BASE_URL, ChosenSpell.index);
}

async function FetchSpecificSpell(urlstring, spellIndex) {
  const response = await fetch(urlstring + "Spells/" + spellIndex);
  const Spell = await response.json();
  console.log(Spell);

  Object.entries(Spell).forEach(([key, value]) => {
    document.getElementById("SpellBox0").innerHTML+=`<p> ${key}: ${value} </p>`;
  });
}

window.onload = () => {
  //none async await method
  fetch(BASE_URL + "Spells")
    .then((response) => response.json())
    .then((data) => AllSpells.push(...data.results))
    .finally(
      (document.getElementById(
        "AllSpellsBox"
      ).innerHTML = `<ul>${AllSpells}</ul>`)
    );

  /* AllSpells.forEach( (index, name, url) => {
    document.getElementById("AllSpellsBox").innerHTML+= "<p>"+ index, name+"</p>";
  });

  */

  //assign functions to buttons
  document
    .getElementById("getRandomSpellButton")
    .addEventListener("click", rollDice);

  //just so we know
  console.log("ready to roll");
};
