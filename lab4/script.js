// ---------- VARIABLES (global) ----------
let sleepy = "";        // 
let wantsSweet = "";    // true or false (empty until the user picks)
let orderCount = 0;     // remembers how many orders the user made (state!)

let pickedColor = "#e8a87c";
let normalColor = "#fffaf3";


// ---------- QUESTION 1: how sleepy? ----------
function pickSleepy(level) {
  sleepy = level;
  console.log("sleepy: " + sleepy);

  // reset all 3 buttons first
  document.getElementsByClassName("sleepy-btn")[0].style.backgroundColor = normalColor;
  document.getElementsByClassName("sleepy-btn")[1].style.backgroundColor = normalColor;
  document.getElementsByClassName("sleepy-btn")[2].style.backgroundColor = normalColor;

  // highlight the one that was picked
  if (level === "barely") {
    document.getElementsByClassName("sleepy-btn")[0].style.backgroundColor = pickedColor;
  } else if (level === "kinda") {
    document.getElementsByClassName("sleepy-btn")[1].style.backgroundColor = pickedColor;
  } else {
    document.getElementsByClassName("sleepy-btn")[2].style.backgroundColor = pickedColor;
  }
}


// ---------- QUESTION 2: sweet or not? ----------
function pickSweet(choice) {
  wantsSweet = choice;
  console.log("sweet: " + wantsSweet);

  document.getElementsByClassName("sweet-btn")[0].style.backgroundColor = normalColor;
  document.getElementsByClassName("sweet-btn")[1].style.backgroundColor = normalColor;

  if (choice === true) {
    document.getElementsByClassName("sweet-btn")[0].style.backgroundColor = pickedColor;
  } else {
    document.getElementsByClassName("sweet-btn")[1].style.backgroundColor = pickedColor;
  }
}


// ---------- DECIDE THE ORDER ----------
function getOrder() {
  let emoji = "";
  let name = "";
  let desc = "";
  let color = "";

  // if they skipped a question
  if (sleepy === "" || wantsSweet === "") {
    emoji = "👀";
    name = "hold on";
    desc = "answer both questions first";
    color = "#f3e9dc";

  } else {
    // 6 possible outcomes
    if (sleepy === "dead" && wantsSweet === true) {
      emoji = "🧋";
      name = "Iced Brown Sugar Oatmilk Shaken Espresso";
      desc = "3 shots + brown sugar. emotional support beverage.";
      color = "#d9b38c";
    } else if (sleepy === "dead" && wantsSweet === false) {
      emoji = "🖤";
      name = "Triple Shot Cold Brew";
      desc = "no thoughts just caffeine.";
      color = "#b08d74";
    } else if (sleepy === "kinda" && wantsSweet === true) {
      emoji = "🎃";
      name = "Pumpkin Spice Latte";
      desc = "it's october. you know what this is.";
      color = "#f4b673";
    } else if (sleepy === "kinda" && wantsSweet === false) {
      emoji = "🍵";
      name = "Iced Matcha Latte";
      desc = "oat milk, no syrup.";
      color = "#bcd4a0";
    } else if (sleepy === "barely" && wantsSweet === true) {
      emoji = "🍓";
      name = "Strawberry Matcha";
      desc = "pink and green. pinterest board.";
      color = "#f7bcc8";
    } else {
      emoji = "🧊";
      name = "Iced Americano";
      desc = "main character.";
      color = "#d8cfc4";
    }

    // count orders (compound assignment)
    orderCount += 1;
  }

  // show the result on the page (DOM)
  document.getElementById("emoji").innerHTML = emoji;
  document.getElementById("drink-name").innerHTML = name;
  document.getElementById("drink-desc").innerHTML = desc;
  document.getElementById("result").style.backgroundColor = color;
  document.body.style.backgroundColor = color;

  // message changes based on PREVIOUS actions
  let message = "";
  if (orderCount === 0) {
    message = "";
  } else if (orderCount === 1) {
    message = "first sip of the day ✨";
  } else if (orderCount <= 3) {
    message = "order #" + orderCount + " today... no judgement";
  } else {
    message = "bestie that's " + orderCount + " drinks. go drink water 💧";
  }
  document.getElementById("counter").innerHTML = message;

  console.log("order: " + name + " | total orders: " + orderCount);
}


// ---------- RESET ----------
function startOver() {
  let answer = confirm("start over? your order count resets too");

  if (answer === true) {
    sleepy = "";
    wantsSweet = "";
    orderCount = 0;

    document.getElementsByClassName("sleepy-btn")[0].style.backgroundColor = normalColor;
    document.getElementsByClassName("sleepy-btn")[1].style.backgroundColor = normalColor;
    document.getElementsByClassName("sleepy-btn")[2].style.backgroundColor = normalColor;
    document.getElementsByClassName("sweet-btn")[0].style.backgroundColor = normalColor;
    document.getElementsByClassName("sweet-btn")[1].style.backgroundColor = normalColor;

    document.getElementById("emoji").innerHTML = "";
    document.getElementById("drink-name").innerHTML = "";
    document.getElementById("drink-desc").innerHTML = "";
    document.getElementById("counter").innerHTML = "";
    document.getElementById("result").style.backgroundColor = "transparent";
    document.body.style.backgroundColor = "#f3e9dc";
  }
}
