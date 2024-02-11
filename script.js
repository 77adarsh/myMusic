console.log("Welcome to Spotify")

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('File/Satranga.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Sataranga", filePath: "File/1.mp3", coverPath: "Cover/Satranga.jpg"},
    {songName: "Hawayein", filePath: "File/2.mp3", coverPath: "Cover/Hawayein.jpg"},
    {songName: "Jo Tu Mera Humdard Hai", filePath: "File/3.mp3", coverPath: "Cover/Best_Of_Arijit.jpg"},
    {songName: "Khairiyat", filePath: "File/4.mp3", coverPath: "Cover/Khairiyat.jpg"},
    {songName: "Khamoshiyan", filePath: "File/5.mp3", coverPath: "Cover/Khamoshiyan.jpg"},
    {songName: "Main Rang Sharbaton", filePath: "File/6.mp3", coverPath: "Cover/Main-Rang-Sharbaton.jpg"},
    {songName: "Main-Phir-Bhi-Tumko-Chahunga", filePath: "File/7.mp3", coverPath: "Cover/Phir Bhi Tumko Chaahunga.jpg"},
    {songName: "Tera Ban Jaunga", filePath: "File/8.mp3", coverPath: "Cover/Tera Ban Jaunga.jpg"},
    {songName: "O Maahi", filePath: "File/9.mp3", coverPath: "Cover/O Maahi - Dunki.jpg"},
    {songName: "Tune Chua Zakhmo Ko Mere", filePath: "File/10.mp3", coverPath: "Cover/Marham-Pehle-Bhi-Main.jpg"}
]

songItem.forEach((element, i) => {
    const imgElement = element.querySelector('img');
    const songNameElement = element.querySelector('.songName');

    if (imgElement) {
        imgElement.src = songs[i].coverPath;
    }

    if (songNameElement) {
        songNameElement.innerText = songs[i].songName;
    }
});


// Handle play/pause click
masterPlay.addEventListener('click', ()=> {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=> {
    console.log('timeupdate');
    // Update SeekBar
    let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
});

const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
    element.addEventListener('click', (e)=> {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `File/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

document.getElementById('next').addEventListener('click', ()=> {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `File/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', ()=> {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `File/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});