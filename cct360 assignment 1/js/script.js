// =========================================
// WHERE'S HERO? - script.js
// Only uses what we learned in Classes 3 & 4:
// let, global variables, functions with parameters,
// getElementById, getElementsByClassName[index],
// .innerHTML, .style.property, +=, concatenation,
// Math.random(), and the "disabled" attribute.
// =========================================


// ===== GLOBAL VARIABLES (Class 4: Global vs. Local) =====
// Declared OUTSIDE the functions, so every function can read and change them.
// This is how the site REMEMBERS what the user has done.
let clues = 0;   // how many clues the user has found
let pets = 0;    // how many times the user petted Hero


// ===== SCENE 1-6: SWITCH SCENES =====
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
// lockId   = which closet lock this clue opens ('lock1' ... 'lock4')
// roomName = the name shown on the hallway button
// note     = the sentence added to the Case Notes
function findClue(room, lockId, roomName, note) {

  // 1. Count the clue (compound assignment operator, Class 4)
  clues += 1;

  // 2. Update the counter and the progress bar
  document.getElementById("count").innerHTML = clues;
  document.getElementById("bar").style.width = clues * 25 + "%";

  // 3. Show the clue in the room
  document.getElementById("clue-" + room).style.display = "block";

  // 4. Disable the search button so the same clue can't be counted twice
  document.getElementById("search-" + room).disabled = true;
  document.getElementById("search-" + room).innerHTML = "Already searched";

  // 5. Remember the visit: put a checkmark on the hallway button
  document.getElementById("btn-" + room).innerHTML = roomName + " &#10003;";

  // 6. Add the clue to the Case Notes (string concatenation)
  document.getElementById("empty-note").style.display = "none";
  document.getElementById("journal").innerHTML += "<li>" + note + "</li>";

  // 7. Open one of the 4 closet locks.
  //    The closet button is nested inside all 4 lock divs,
  //    so it only appears once ALL 4 clues are found (in any order).
  document.getElementById(lockId).style.display = "block";
}


// ===== CALL FOR HERO (Math.random, Class 4) =====
// A random number decides how loud the meow sounds.
function callHero() {
  let loudness = Math.random() * 20 + 14;   // a number from 14 to 34
  document.getElementById("meow").innerHTML = "...meow?";
  document.getElementById("meow").style.fontSize = loudness + "px";
}


// ===== PET HERO (ending scene) =====
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

  // reset the tracker
  document.getElementById("count").innerHTML = clues;
  document.getElementById("bar").style.width = "0%";

  // reset each room
  resetRoom("kitchen", "Kitchen", "Look under the table");
  resetRoom("bedroom", "Bedroom", "Check the bed");
  resetRoom("livingroom", "Living Room", "Inspect the couch");
  resetRoom("balcony", "Balcony", "Look by the plants");

  // lock the closet again
  document.getElementById("lock1").style.display = "none";
  document.getElementById("lock2").style.display = "none";
  document.getElementById("lock3").style.display = "none";
  document.getElementById("lock4").style.display = "none";

  // clear the notes and messages
  document.getElementById("journal").innerHTML = "";
  document.getElementById("empty-note").style.display = "block";
  document.getElementById("meow").innerHTML = "";
  document.getElementById("purr").innerHTML = "";

  // go back to the start
  showScene("hallway");
}
