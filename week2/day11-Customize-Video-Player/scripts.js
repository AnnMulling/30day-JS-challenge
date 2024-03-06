/* get elements */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full__screen');


/* build functions */
//toggle property pause/play
function togglePlay()  {
    video.paused ? video.play() : video.pause()

};

function updateButton () {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;

};

function skip(){
    //this.dataset.skip is a string parse to change data type
    video.currentTime += parseFloat(this.dataset.skip);
};

function rangeUpdate() {
    video[this.name] = this.value;
    console.log(this)
};

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;

};

function scrub(e) {
    const srubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = srubTime;
};

/* Full Screen */
function handleFullScreen(){
    if (video.webkitSupportsFullscreen) {
        video.webkitEnterFullscreen();
        return;
      }
      video.requestFullscreen();
};

document.addEventListener("fullscreenchange", function () {
    if (document.fullscreenElement) {
      video.setAttribute("controls", true);
      return;
    }
    video.removeAttribute("controls");
});
/* Hook up the event listener */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach((button) => button.addEventListener('click', skip));
ranges.forEach((range) => range.addEventListener('change', rangeUpdate));

let mousedown = false;
//only fire when click and drage
progress.addEventListener('click', scrub)
ranges.forEach((range) => {
    range.addEventListener('mousemove', () => mousedown && rangeUpdate())
    range.addEventListener('mousedown', () => mousedown = true);
    range.addEventListener('mouseup', () => mousedown = false);
});
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

//fullscreen
fullScreen.addEventListener('click', handleFullScreen )
