//URL for all spells
const API_ENDPOINT = "https://www.dnd5eapi.co";
//contains all spells once fetched from API
const ALL_SPELLS = [];
//maximum number for the roll
let maxForRoll = ALL_SPELLS.length;
//Contains one spell
let ChosenSpell = [];

//simulates a 'dice roll' with chances of 0 to allSpells length
function rollDice() {
  let currentSpellAndLevel = document.getElementById("SpellBox0").innerHTML;
  document.getElementById(
    "historyContainer"
  ).innerHTML += `<p> ${currentSpellAndLevel} </p>`;
  document.getElementById("SpellBox0").innerHTML = "<h5> RANDOM SPELL </h5>";

  let roll = Math.floor(Math.random() * maxForRoll);

  ChosenSpell = ALL_SPELLS[roll];

  console.log("clicked, got: ", roll);
  document.getElementById("diceBox").innerHTML = `You rolled: ${roll}`;

  FetchSpecificSpell(ChosenSpell.url);
}

// uses fetch to get the JSON of a specific spell and add it as a dom element in 'SpellBox0'
async function FetchSpecificSpell(spellIndex) {
  try {
    const response = await fetch(API_ENDPOINT + spellIndex);
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

    //some of these need to be found and printed or they throw errors when not present WIP - need to expand on the nested objects
    Object.entries(spell).forEach(([key, value]) => {
      if (key == "damage") {
        document.getElementById("SpellBox0").innerHTML += `
          <h3>Damage: </h3>
          <p>Damage per spell slot level: ${JSON.stringify(
            value.damage_at_slot_level
          )}</p>
          <p>Damage at character level: ${JSON.stringify(
            value.damage_at_character_level
          )} </p>
          <p>Damage Type: ${value.damage_type.name}</p>
          <hr>
        `;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

//searchbox functions

function findMatches(wordToMatch, list) {
  return list.filter((spell) => {
    const regex = new RegExp(wordToMatch, "gi");
    return spell.name.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, ALL_SPELLS);
  const SuggestionBox = document.getElementById("suggestions");
  SuggestionBox.innerHTML = '';

  Object.entries(matchArray).forEach(([key, value]) => {
    SuggestionBox.innerHTML += `<li onclick="FetchSpecificSpell('${value.url}')">  ${value.name} </li>`;
  });

}

window.onload = async () => {
  // DOM element for the 'Available spells'.
  const ALL_SPELLS_BOX = document.getElementById("AllSpellsBox");

  try {
    const response = await fetch(API_ENDPOINT + "/api/spells");
    const allSpellsJson = await response.json();
    for (spell of allSpellsJson.results) {
      ALL_SPELLS.push(spell);
    }
  } catch (error) {
    console.error(error);
  }

  //reset the spells box and add each spell
  ALL_SPELLS_BOX.innerHTML = ``;
  Object.entries(ALL_SPELLS).forEach(([key, value]) => {
    ALL_SPELLS_BOX.innerHTML += `<li onclick="FetchSpecificSpell('${value.url}')"> ${key} ${value.name} </li>`;
  });

  //assign functions to UI elements
  document
    .getElementById("getRandomSpellButton")
    .addEventListener("click", rollDice);

  document
    .getElementById("searchBox")
    .addEventListener("change", displayMatches);

  //just so we know
  console.log("ready to roll");
};
