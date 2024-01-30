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
  let currentSpellAndLevel = document.getElementById("SpellBox0").innerHTML;
  document.getElementById("historyContainer").innerHTML+=`<p> ${currentSpellAndLevel} </p>`;
  document.getElementById("SpellBox0").innerHTML = '';

  let roll = Math.floor(Math.random() * maxForRoll);

  ChosenSpell = AllSpells[roll];

  console.log("clicked, got: ", roll);
  document.getElementById("diceBox").innerHTML = `You rolled: ${roll}`;

  FetchSpecificSpell(ChosenSpell.index);
}

async function FetchSpecificSpell(spellIndex) {


  const response = await fetch(BASE_URL+"Spells/"+spellIndex);
  const spell = await response.json();
  console.log(spell);

  document.getElementById("SpellBox0").innerHTML += `
    <h2>${spell.name} at level ${
      Math.floor(Math.random() * (9 - spell.level + 1)) + spell.level
  }</h2>
    <p>Range: ${spell.range}</p>
    <p>Duration: ${spell.duration}</p>
    <p>School: ${spell.school.name} </p>
    <p>Spell level: ${spell.level} </p>
    <p>Description: ${spell.desc}</p>
    <p>Higher Level: ${spell.higher_level}</p>
    <hr>
    `;

  //some of these need to be found and printed or they throw errors when not present
  Object.entries(AllSpells).forEach(([key, value]) => {
    if (key == "damage") {
      document.getElementById("SpellBox0").innerHTML += `
          <p>Damage ${value.damage_at_slot_level}</p>
          <p>${value.damage_type}</p>
        `;
    }
  });
}

window.onload = async () => {
  const response = await fetch(BASE_URL + "Spells");
  const AllSpellsJson = await response.json();
  AllSpells = AllSpellsJson.results;
  //console.log(AllSpells)

  document.getElementById("AllSpellsBox").innerHTML = ``;
  Object.entries(AllSpells).forEach(([key, value]) => {
    document.getElementById(
      "AllSpellsBox"
    ).innerHTML += `<li> ${key} ${value.name} </li>`;
  });

  //assign functions to buttons
  document
    .getElementById("getRandomSpellButton")
    .addEventListener("click", rollDice);

  //just so we know
  console.log("ready to roll");
};
