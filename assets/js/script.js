
const audioPlayer = document.querySelector('#audio-player');
const songName = document.querySelector('#song-name');
const songAuthor = document.querySelector('#song-author');
const playerCurrentTime = document.querySelector('#player-current-time');
const playerDuration = document.querySelector('#player-duration');
const playerProgress = document.querySelector('#player-progress');
const btnRepeat = document.querySelector('#btn-repeat');
const btnPrev = document.querySelector('#btn-prev');
const btnPlay = document.querySelector('#btn-play');
const btnPlayIcon = document.querySelector('#btn-play-icon');
const btnNext = document.querySelector('#btn-next');
const btnVolume = document.querySelector('#btn-volume');
const btnVolumeIcon = document.querySelector('#btn-volume i');
const playerVolume = document.querySelector('#player-volume');

// Initial data
let currentSong = 0;
let repeatSong = false;

const songs = [
    {
        name: 'No Longer Bound',
        author: 'Forrest Frank, Hulvey',
        path: './assets/songs/no-longer-bound.mp3',
    },
    {
        name: 'Open up My Heart',
        author: 'Isla Vista Worship',
        path: './assets/songs/open-up-my-heart.mp3',
    },
    {
        name: 'Best Friends',
        author: 'Hillsong Young & Free',
        path: './assets/songs/best-friends.mp3',
    },
    {
        name: 'Coming In Hot',
        author: 'Lecrae, Andy Mineo',
        path: './assets/songs/coming-in-hot.mp3',
    },
    {
        name: '814',
        author: 'Isla Vista Worship',
        path: './assets/songs/814.mp3',
    },
    {
        name: 'Phenomena',
        author: 'Hillsong Young & Free',
        path: './assets/songs/phenomena.mp3',
    },
];

btnPlay.addEventListener('click', () => togglePlaySong());
btnPrev.addEventListener('click', () => changeSong(false));
btnNext.addEventListener('click', () => changeSong());
btnRepeat.addEventListener('click', () => toggleRepeatSong());
playerVolume.addEventListener('input', () => changeVolume());
playerProgress.addEventListener('input', () => changeTime());
audioPlayer.addEventListener('timeupdate', () => timeUpdate());
audioPlayer.addEventListener('ended', () => ended());

// Play and pause music
const togglePlaySong = () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        btnPlayIcon.classList.replace('bi-play-fill', 'bi-pause-fill');
    }
    else {
        audioPlayer.pause();
        btnPlayIcon.classList.replace('bi-pause-fill', 'bi-play-fill');
    }
};

// Change song from the list
const changeSong = (next = true) => {
    if (next && currentSong < songs.length - 1) {
        currentSong++;
    }
    else if (!next && currentSong > 0) {
        currentSong--;
    }
    else {
        return;
    }

    updatePlayer();
    togglePlaySong();
};

// Update data of the currently playing song
const updatePlayer = () => {
    const song = songs[currentSong];

    songName.innerHTML = song.name;
    songAuthor.innerHTML = song.author;
    audioPlayer.src = song.path;
    playerProgress.value = audioPlayer.currentTime;
};

// Repeat music
const toggleRepeatSong = () => {
    repeatSong = !repeatSong;
    btnRepeat.classList.toggle('btn-activated');
};

// Show the current time of the song and its total length
const timeUpdate = () => {
    const { currentTime, duration } = audioPlayer;

    if (isNaN(duration)) return;

    playerDuration.innerHTML = formatSecondsToMinutes(duration);
    playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime);
    playerProgress.max = duration;
    playerProgress.value = currentTime;
};

// Change the music volume
const changeVolume = () => {
    const { value } = playerVolume;

    audioPlayer.volume = value;

    if (value == 0) {
        btnVolumeIcon.classList.replace('bi-volume-up-fill', 'bi-volume-mute-fill');
    }
    else {
        btnVolumeIcon.classList.replace('bi-volume-mute-fill', 'bi-volume-up-fill');
    }
};

const changeTime = () => {
    audioPlayer.currentTime = playerProgress.value;
};

const formatSecondsToMinutes = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
};

// Change to the next song
const ended = () => {
    repeatSong ? togglePlaySong() : changeSong(true);
};

// Update the music data
window.onload = () => {
    updatePlayer();
};