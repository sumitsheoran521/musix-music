
const PlayMusic = (url) => {
    const audio = new Audio(url);
    audio.play();
}

export default PlayMusic;