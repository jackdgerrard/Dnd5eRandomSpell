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
  let roll = Math.floor(Math.random() * maxForRoll);
  ChosenSpell = AllSpells[roll];

  console.log("clicked, got: ", roll);
  document.getElementById("diceBox").innerHTML = `You rolled: ${roll}`;

  FetchSpecificSpell(BASE_URL, ChosenSpell.index);
}

async function FetchSpecificSpell(urlstring, spellIndex) {
  const response = await fetch(urlstring + "Spells/" + spellIndex);
  const spell = await response.json();
  console.log(spell);

  document.getElementById("SpellBox0").innerHTML+=`
    <h2>${spell.name} at level ${Math.floor(Math.random() * 10) + spell.level}</h2>
    
    `;

  Object.entries(spell).forEach(([key, value]) => {
    document.getElementById("SpellBox0").innerHTML+=`
    <p> ${key}: ${value} </p>
    
    
    `;
  });
}

window.onload = async() => {
  const response = await fetch(BASE_URL + "Spells");
  const AllSpellsJson = await response.json();
  AllSpells = AllSpellsJson.results
  //console.log(AllSpells)

  document.getElementById("AllSpellsBox").innerHTML=``;
  Object.entries(AllSpells).forEach(([key, value]) => {
    document.getElementById("AllSpellsBox").innerHTML+=`<li> ${key} ${value.name} </li>`;
  });


  //assign functions to buttons
  document
    .getElementById("getRandomSpellButton")
    .addEventListener("click", rollDice);

  //just so we know
  console.log("ready to roll");
};
