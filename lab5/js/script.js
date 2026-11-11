// get the HTML elements
let player = document.getElementById("player");
let video = document.getElementById("cityVideo");
let message = document.getElementById("message");
let title = document.getElementById("title");

let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let stopBtn = document.getElementById("stopBtn");
let volumeUpBtn = document.getElementById("volumeUpBtn");
let volumeDownBtn = document.getElementById("volumeDownBtn");

let volume = 1.0;

// button clicks (custom controls)
playBtn.addEventListener("click", playAudio);
pauseBtn.addEventListener("click", pauseAudio);
stopBtn.addEventListener("click", stopAudio);
volumeUpBtn.addEventListener("click", volumeUp);
volumeDownBtn.addEventListener("click", volumeDown);

function playAudio() {
  player.play();
}

function pauseAudio() {
  player.pause();
}

function stopAudio() {
  player.currentTime = 0;
  player.pause();
}

// audio events: the video and the page react to the sound
player.addEventListener("play", playerStarted);
player.addEventListener("timeupdate", playerProgressed);
player.addEventListener("pause", playerPaused);
player.addEventListener("ended", playerEnded);

function playerStarted() {
  video.play();
  video.style.opacity = "1";
  document.body.style.backgroundColor = "#6b4a2b";
  title.style.color = "#ffd27a";
  message.innerHTML = "The soundscape is playing";
}

function playerProgressed() {
  if (player.paused == false) {
    let minutes = Math.floor(player.currentTime / 60);
    let seconds = Math.floor(player.currentTime) - minutes * 60;
    message.innerHTML = "The soundscape is playing at " + minutes + ":" + seconds;
  }
}

function playerPaused() {
  video.pause();
  video.style.opacity = "0.4";
  document.body.style.backgroundColor = "#2b2118";
  title.style.color = "#f3e6d3";
  message.innerHTML = "The soundscape is paused";
}

function playerEnded() {
  video.pause();
  video.currentTime = 0;
  message.innerHTML = "The soundscape has ended. Press play to listen again";
}

// volume: the video gets bigger when it's louder and smaller when it's quieter
function volumeUp() {
  volume += 0.1;
  if (volume > 1.0) {
    volume = 1.0;
  }
  player.volume = volume;
  updateVolume();
}

function volumeDown() {
  volume -= 0.1;
  if (volume < 0.0) {
    volume = 0.0;
  }
  player.volume = volume;
  updateVolume();
}

function updateVolume() {
  video.style.width = (30 + volume * 40) + "%";
  message.innerHTML = "Volume: " + Math.round(volume * 10) * 10 + "%";
}
