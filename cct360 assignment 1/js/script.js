// =========================================
// WHERE'S HERO? - script.js
// let, global variables, functions with parameters,
// getElementById, getElementsByClassName[index],
// .innerHTML, .style.property, +=, concatenation,
// Math.random(), the "disabled" attribute, and if statements.
// =========================================


// ===== GLOBAL VARIABLES (Class 4: Global vs. Local) =====
// Declared OUTSIDE the functions

let clues = 0;        // how many clues the user has found
let pets = 0;         // how many times the user petted Hero
let calls = 0;        // how many times the user called for Hero
let firstRoom = "";   // the first room where a clue was found


// ===== SWITCH SCENES =====
// Hides all 6 scenes, then shows the one we want.
// sceneName is a parameter, e.g. showScene('kitchen')
function showScene(sceneName) {
  document.getElementsByClassName("scene")[0].style.display = "none";
  document.getElementsByClassName("scene")[1].style.display = "none";
  document.getElementsByClassName("scene")[2].style.display = "none";
  document.getElementsByClassName("scene")[3].style.display = "none";
  document.getElementsByClassName("scene")[4].style.display = "none";
  document.getElementsByClassName("scene")[5].style.display = "none";

  document.getElementById(sceneName).style.display = "block";
}


// ===== STATE-BASED INTERACTION: COLLECT A CLUE =====
// room     = the room id ('kitchen', 'bedroom', ...)
// roomName = the name shown on the hallway button
// note     = the sentence added to the Case Notes
function findClue(room, roomName, note) {

  // 1. Count the clue
  clues += 1;

  // 2. Remember where the search started (only on the first clue)
  if (clues === 1) {
    firstRoom = roomName;
  }

  // 3. Update the counter and the progress bar
  document.getElementById("count").innerHTML = clues;
  document.getElementById("bar").style.width = clues * 25 + "%";

  // 4. Show the clue in the room
  document.getElementById("clue-" + room).style.display = "block";

  // 5. Disable the search button so the same clue can't be counted twice
  document.getElementById("search-" + room).disabled = true;
  document.getElementById("search-" + room).innerHTML = "Already searched";

  // 6. Remember the visit: put a checkmark on the hallway button
  document.getElementById("btn-" + room).innerHTML = roomName + " &#10003;";

  // 7. Add the clue to the Case Notes
  document.getElementById("empty-note").style.display = "none";
  document.getElementById("journal").innerHTML += "<li>" + note + "</li>";

  // 8. Unlock the closet once ALL 4 clues are found (in any order)
  if (clues === 4) {
    document.getElementById("closet-door").style.display = "block";
  }
}


// ===== OPEN THE CLOSET =====
// Writes a recap using what the site remembered, then shows the closet.
function openCloset() {
  document.getElementById("recap").innerHTML =
    "Your search started in the " + firstRoom + ", and you called for Hero " + calls + " times along the way.";
  showScene("closet");
}


// ===== THE FINAL CHOICE: TWO ENDINGS =====
// choice is either 'cuddle' or 'sleep'
function chooseEnding(choice) {
  // hide the question and the two choice buttons
  document.getElementById("choice-title").style.display = "none";
  document.getElementById("choices").style.display = "none";

  // show the ending the user picked
  if (choice === "cuddle") {
    document.getElementById("ending-cuddle").style.display = "block";
  } else {
    document.getElementById("ending-sleep").style.display = "block";
  }

  // now the user can play again
  document.getElementById("play-again").style.display = "inline-block";
}


// ===== CALL FOR HERO (Math.random, Class 4) =====
// A random number decides how loud the meow sounds.
function callHero() {
  calls += 1;
  let loudness = Math.random() * 20 + 14;   // a number from 14 to 34
  document.getElementById("meow").innerHTML = "...meow?";
  document.getElementById("meow").style.fontSize = loudness + "px";
}


// ===== PET HERO (cuddle ending) =====
function petHero() {
  pets += 1;
  document.getElementById("purr").innerHTML = "Purrr... Hero has been petted " + pets + " times.";
}


// ===== PLAY AGAIN: RESET EVERYTHING =====
// Each room gets reset with one call to resetRoom().
function resetRoom(room, roomName, buttonText) {
  document.getElementById("clue-" + room).style.display = "none";
  document.getElementById("search-" + room).disabled = false;
  document.getElementById("search-" + room).innerHTML = buttonText;
  document.getElementById("btn-" + room).innerHTML = roomName;
}

function restartGame() {
  // reset the global variables
  clues = 0;
  pets = 0;
  calls = 0;
  firstRoom = "";

  // reset the tracker
  document.getElementById("count").innerHTML = clues;
  document.getElementById("bar").style.width = "0%";

  // reset each room
  resetRoom("kitchen", "Kitchen", "Look under the table");
  resetRoom("bedroom", "Bedroom", "Check the bed");
  resetRoom("livingroom", "Living Room", "Inspect the couch");
  resetRoom("balcony", "Balcony", "Look by the plants");

  // lock the closet again
  document.getElementById("closet-door").style.display = "none";

  // reset the endings and bring back the choice
  document.getElementById("ending-cuddle").style.display = "none";
  document.getElementById("ending-sleep").style.display = "none";
  document.getElementById("choice-title").style.display = "block";
  document.getElementById("choices").style.display = "flex";
  document.getElementById("play-again").style.display = "none";

  // clear the notes and messages
  document.getElementById("journal").innerHTML = "";
  document.getElementById("empty-note").style.display = "block";
  document.getElementById("meow").innerHTML = "";
  document.getElementById("purr").innerHTML = "";
  document.getElementById("recap").innerHTML = "";

  // go back to the start
  showScene("hallway");
}
