const video = document.getElementById("video");
const sourceSrc = document.getElementById("source-url");
const videoThumbnail = document.getElementById("video-thumbnail");
const playpause = document.getElementById("playpause");
const frwd = document.getElementById("skip-10");
const bkwrd = document.getElementById("skipminus-10");
const volume = document.getElementById("volume");
const mutebtn = document.getElementById("mute");
const videoContainer = document.querySelector(".video-container");
const controls = document.querySelector(".controls");
const progressBar = document.querySelector(".progress-bar");
const playbackline = document.querySelector(".playback-line");
const currentTimeRef = document.getElementById("current-time");
const maxDuration = document.getElementById("max-duration");
const submitBtn = document.getElementById("inputurl");

let isPlaying = false;

function togglePlayPause() {
    if (isPlaying) {
        video.pause();
        playpause.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        //videoThumbnail.style.display = "none";
        video.play();
        playpause.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

function showThumbnail() {
    videoThumbnail.style.display = "block";
}

function videoPlayer() {
    const inputUrl = document.getElementById("input-url").value; 
    if (!inputUrl) {
        alert('Please enter a valid video URL.');
        return;
    }
    sourceSrc.src = inputUrl;
    video.load(); 

    const timeFormatter = (timeInput) => {
        let minute = Math.floor(timeInput / 60);
        minute = minute < 10 ? "0" + minute : minute;
        let second = Math.floor(timeInput % 60);
        second = second < 10 ? "0" + second : second;
        return `${minute}:${second}`;
    };

    playpause.addEventListener("click", togglePlayPause);

    document.addEventListener("keydown", function (event) {
        if (event.key === " " || event.key === "Spacebar") {
            event.preventDefault(); 
            togglePlayPause();
        }
        if (event.key.toLowerCase() === "m") { 
            toggleMute();
        }
    });

    video.addEventListener("play", function () {
        isPlaying = true;
    });

    video.addEventListener("pause", function () {
        isPlaying = false;
    });

    video.addEventListener("ended", function () {
        playpause.innerHTML = '<i class="fa-solid fa-play"></i>';
        showThumbnail();
    });

    frwd.addEventListener("click", function () {
        video.currentTime += 10;
    });

    bkwrd.addEventListener("click", function () {
        video.currentTime -= 10;
    });

    mutebtn.addEventListener("click", toggleMute);

    function toggleMute() {
        if (video.muted) {
            video.muted = false;
            mutebtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            volume.value = video.volume;
        } else {
            video.muted = true;
            mutebtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            volume.value = 0;
        }
    }

    
    volume.addEventListener("input", function () {
        video.volume = volume.value;
        if (video.volume === 0) {
            mutebtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            mutebtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    videoContainer.addEventListener("mouseenter", () => {
        controls.style.opacity = 1;
    });

    videoContainer.addEventListener("mouseleave", () => {
        controls.style.opacity = 0;
    });

    video.addEventListener("timeupdate", () => {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const percentage = (currentTime / duration) * 100;
        progressBar.style.width = percentage + "%";
        currentTimeRef.innerHTML = timeFormatter(currentTime);
        maxDuration.innerText = timeFormatter(duration);
    });

    video.addEventListener("ended", () => {
        progressBar.style.width = "0%";
        showThumbnail();
    });

    playbackline.addEventListener("click", (e) => {
        let timelineWidth = playbackline.clientWidth;
        video.currentTime = (e.offsetX / timelineWidth) * video.duration;
    });
}

submitBtn.addEventListener('click', videoPlayer);
