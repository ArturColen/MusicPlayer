
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

let currentSong = 0;
let repeatSong = false;

const songs = [
    {
        name: 'Oh Meu Deus',
        author: 'Projota',
        path: './assets/songs/oh-meu-deus.mp3',
    },
    {
        name: 'Essa Eu Fiz Pro Nosso Amor',
        author: 'Jão',
        path: './assets/songs/essa-eu-fiz-pro-nosso-amor.mp3',
    },
    {
        name: 'The Greatest',
        author: 'Sia',
        path: './assets/songs/the-greatest.mp3',
    },
    {
        name: 'People You Know',
        author: 'Selena Gomez',
        path: './assets/songs/people-you-know.mp3',
    },
    {
        name: 'Clocks',
        author: 'Coldplay',
        path: './assets/songs/clocks.mp3',
    },
    {
        name: 'Nosso Quadro',
        author: 'Ana Castela',
        path: './assets/songs/nosso-quadro.mp3',
    },
    {
        name: 'Ela Só Quer Paz',
        author: 'Projota',
        path: './assets/songs/ela-so-quer-paz.mp3',
    },
    {
        name: 'Si No Estás (Speed Up)',
        author: 'Iñigo Quintero',
        path: './assets/songs/si-no-estas.mp3',
    },
    {
        name: 'A Sky Full Of Stars',
        author: 'Coldplay',
        path: './assets/songs/a-sky-full-of-stars.mp3',
    },
    {
        name: 'Mirrors',
        author: 'Justin Timberlake',
        path: './assets/songs/mirrors.mp3',
    },
    {
        name: 'Titanium',
        author: 'David Guetta ft. Sia',
        path: './assets/songs/titanium.mp3',
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

const updatePlayer = () => {
    const song = songs[currentSong];

    songName.innerHTML = song.name;
    songAuthor.innerHTML = song.author;
    audioPlayer.src = song.path;
    playerProgress.value = audioPlayer.currentTime;
};

const toggleRepeatSong = () => {
    repeatSong = !repeatSong;
    btnRepeat.classList.toggle('btn-activated');
};

const timeUpdate = () => {
    const { currentTime, duration } = audioPlayer;

    if (isNaN(duration)) return;

    playerDuration.innerHTML = formatSecondsToMinutes(duration);
    playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime);
    playerProgress.max = duration;
    playerProgress.value = currentTime;
};

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

const ended = () => {
    repeatSong ? togglePlaySong() : changeSong(true);
};

window.onload = () => {
    updatePlayer();
};
