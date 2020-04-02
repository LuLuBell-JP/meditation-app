const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${('00' + Math.floor(fakeDuration % 60)).slice(-2)}`;

sounds.forEach(sound => {
    sound.addEventListener("click", function() {
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        checkPlaying(song);
    });
});

play.addEventListener("click", function() {
    checkPlaying(song);
});

replay.addEventListener("click", function() {
    restartSong(song);
});

const restartSong = song =>{
    song.currentTime = 0;
}

timeSelect.forEach(option => {
    option.addEventListener("click", function() {
        fakeDuration = this.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${('00' + Math.floor(fakeDuration % 60)).slice(-2)}`;
    });
});

const checkPlaying = song => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
    } else {
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
    }
};

song.ontimeupdate = function() {
    const currentTime = song.currentTime;
    const elapsed = fakeDuration - currentTime;
    const seconds = ('00' + Math.floor(elapsed % 60)).slice(-2);
    const minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
    const progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();
    }
};
