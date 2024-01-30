let Spells = null;
//unused for now
let min = 0;
//maximum number for the roll
let maxForRoll = 318;

function getRandomInt(maxForRoll) {
  return Math.floor(Math.random() * maxForRoll);
}

function RollDice(){
    let Roll = getRandomInt();
    document.getElementById("diceBox").innerHTML=Roll;
}

function getAllSpells(){
    const response = await fetch("https://www.dnd5eapi.co/api/Spells");
    Spells = await response.json();
    console.log("spells retrieved");
    for(spell in spells){
        document.getElementById("AllSpellsBox").innerHTML=spell.name
    }
}