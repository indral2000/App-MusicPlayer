const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Pumped Up Kicks',
        cover: 'assets/1.jpg',
        artist: 'Foster The People',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Jumpsuit',
        cover: 'assets/2.jpg',
        artist: 'Twenty One Pilots',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'I Need A Doctor',
        cover: 'assets/3.jpg',
        artist: 'Dr. Dre ft. Eminem, Skylar Grey',

    },
    {
        path: 'assets/4.mp3',
        displayName: 'Mockingbird',
        cover: 'assets/4.jpg',
        artist: 'Eminem',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Lose Yourself',
        cover: 'assets/5.jpg',
        artist: 'Eminem',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'The Real Slim Shady',
        cover: 'assets/6.jpg',
        artist: 'Eminem',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Godzilla',
        cover: 'assets/7.jpg',
        artist: 'Eminem ft. Juice WRLD',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Without Me',
        cover: 'assets/8.jpg',
        artist: 'Eminem',
    },
    {
        path: 'assets/9.mp3',
        displayName: 'Rap God',
        cover: 'assets/9.jpg',
        artist: 'Eminem',
    },
    {
        path: 'assets/10.mp3',
        displayName: 'Venom',
        cover: 'assets/10.jpg',
        artist: 'Eminem',
    },
    {
        path: 'assets/11.mp3',
        displayName: 'Temporary',
        cover: 'assets/11.jpg',
        artist: 'Eminem ft. Skylar Grey',

    },
    {
        path: 'assets/12.mp3',
        displayName: 'The Monster',
        cover: 'assets/12.jpg',
        artist: 'Eminem ft. Rihanna',
    },
    {
        path: 'assets/13.mp3',
        displayName: 'Worlds Smallest Violi',
        cover: 'assets/13.jpg',
        artist: 'AJR',
    },
    {
        path: 'assets/14.mp3',
        displayName: 'Pompeii',
        cover: 'assets/14.jpg',
        artist: 'Bastille',
    },
    {
        path: 'assets/15.mp3',
        displayName: 'Judas',
        cover: 'assets/15.jpg',
        artist: 'Lady Gaga',
    },
    {
        path: 'assets/16.mp3',
        displayName: 'Bad Boy',
        cover: 'assets/16.jpg',
        artist: 'Marwa Loud',
    },
    {
        path: 'assets/17.mp3',
        displayName: 'House of Gold',
        cover: 'assets/17.jpg',
        artist: 'Twenty One Pilots',
    },
    {
        path: 'assets/18.mp3',
        displayName: 'Levitate',
        cover: 'assets/18.jpg',
        artist: 'Twenty One Pilots',
    },
    {
        path: 'assets/19.mp3',
        displayName: 'The Outsidde',
        cover: 'assets/19.jpg',
        artist: 'Twenty One Pilots',
    },
    {
        path: 'assets/20.mp3',
        displayName: 'Bandito',
        cover: 'assets/20.jpg',
        artist: 'Twenty One Pilots',
    },
    {
        path: 'assets/21.mp3',
        displayName: 'Paladin Strait',
        cover: 'assets/21.jpg',
        artist: 'Twenty One Pilots',
    },
    {
        path: 'assets/22.mp3',
        displayName: 'Routines In The Night',
        cover: 'assets/22.jpg',
        artist: 'Twenty One Pilots',
    },
    {
        path: 'assets/23.mp3',
        displayName: 'The Craving',
        cover: 'assets/23.jpg',
        artist: 'Twenty One Pilots',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover; // Pastikan ini diubah
    console.log(`Loading music: ${song.displayName}, Cover: ${song.cover}`); // Debugging
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
