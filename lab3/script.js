// the three images on the page
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");

// the text that changes with each sequence
let storyTitle = document.getElementById("story-title");
let caption = document.getElementById("caption");

// the three image files
let house = "images/house.jpg";
let suitcase = "images/suitcase.jpg";
let plane = "images/plane.jpg";

// Sequence One: house, suitcase, plane
function showSequenceOne() {
  image1.src = house;
  image2.src = suitcase;
  image3.src = plane;

  storyTitle.innerHTML = "Sequence One: Leaving Home";
  caption.innerHTML =
    "Beginning: she is at home. Middle: she packs her suitcase. End: she flies away.";
}

// Sequence Two: plane, suitcase, house
function showSequenceTwo() {
  image1.src = plane;
  image2.src = suitcase;
  image3.src = house;

  storyTitle.innerHTML = "Sequence Two: Coming Home";
  caption.innerHTML =
    "Beginning: her plane lands. Middle: she picks up her suitcase. End: she is finally home.";
}

let btn1 = document.getElementById("sequence-one");
btn1.addEventListener("click", showSequenceOne);

let btn2 = document.getElementById("sequence-two");
btn2.addEventListener("click", showSequenceTwo);