const playlist = [
  {
    title: "Cyberpunk",
    artist: "ATEEZ",
    src: "assets/songs/Ateez-Cyberpunk.aac",
    cover: "assets/images/ateez.jpg"
  },
  {
    title: "Halazia",
    artist: "ATEEZ",
    src: "assets/songs/Ateez-Halazia.mp3",
    cover: "assets/images/ateez.jpg"
  },
  {
    title: "Inception",
    artist: "ATEEZ",
    src: "assets/songs/Ateez-Inception.aac",
    cover: "assets/images/ateez.jpg"
  },
  {
    title: "All for Love",
    artist: "WayV",
    src: "assets/songs/WayV-Allforlove.mp3",
    cover: "assets/images/wayv.jpg"
  },
  {
    title: "Love Talk",
    artist: "WayV",
    src: "assets/songs/WayV-Lovetalk.mp3",
    cover: "assets/images/wayv.jpg"
  },
  {
    title: "Phantom",
    artist: "WayV",
    src: "assets/songs/WayV-Phantom.mp3",
    cover: "assets/images/wayv.jpg"
  }
];

let currentIndex = 0;

const audio = document.getElementById('audio');
const volumeSlider = document.getElementById('volume');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const shuffleBtn = document.getElementById('shuffle');
const title = document.getElementById('song-title');
const artist = document.getElementById('song-artist');
const coverImg = document.getElementById('cover-img');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

audio.volume = volumeSlider.value;

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

function loadSong(index) {
  const song = playlist[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  coverImg.src = song.cover;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = '&#10073;&#10073;';
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '&#9654;';
}

playBtn.addEventListener('click', () => {
  audio.paused ? playSong() : pauseSong();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  playSong();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
  playSong();
});

shuffleBtn.addEventListener('click', () => {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * playlist.length);
  } while (randomIndex === currentIndex);
  currentIndex = randomIndex;
  loadSong(currentIndex);
  playSong();
});


audio.addEventListener('ended', () => {
  nextBtn.click();
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

progress.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

loadSong(currentIndex);
