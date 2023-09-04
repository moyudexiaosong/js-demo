const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;


const loadSong = (song) => {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpeg`
}
loadSong(songs[songIndex])
const playSong = () => {
    if (audio.paused) {
        musicContainer.classList.add('play')
        playBtn.querySelector('i.fas').classList.remove('fa-play')
        playBtn.querySelector('i.fas').classList.add('fa-pause')
        audio.play()
    } else {
        musicContainer.classList.remove('play')
        playBtn.querySelector('i.fas').classList.add('fa-play')
        playBtn.querySelector('i.fas').classList.remove('fa-pause')
        audio.pause()
    }
}
playBtn.addEventListener('click', playSong)

const prevSong = () => {
    switch (songIndex) {
        case 0:
            songIndex = 2
            break
        case 1:
            songIndex = 0
            break
        case 2:
            songIndex = 1;
            break
        default:
            break
    }
    loadSong(songs[songIndex])
    playSong()
}
prevBtn.addEventListener('click', prevSong)
const nextSong = () => {
    switch (songIndex) {
        case 0:
            songIndex = 1
            break
        case 1:
            songIndex = 2
            break
        case 2:
            songIndex = 0;
            break
        default:
            break
    }
    loadSong(songs[songIndex])
    playSong()
}
nextBtn.addEventListener('click', nextSong)

// const DurTime = e => {
//     const { duration, currentTime } = e.srcElement
//     // 定义当前时间
//     let min = (currentTime == null) ? 0 : Math.floor(currentTime / 60)
//     min = min < 10 ? '0' + min : min
//     let sec = (currentTime == null) ? 0 : Math.floor(currTime % 60)
//     sec = sec < 10 ? '0' + sec : sec
//     currTime.innerText = min + ':' + sec
//     // 定义持续时间
//     let min_d = (duration == null) ? 0 : Math.floor(duration / 60)
//     min_d = min_d < 10 ? '0' + min_d : min_d
//     let sec_d = (duration == null) ? 0 : Math.floor(duration % 60)
//     sec_d = sec_d < 10 ? '0' + sec_d : sec_d
//     durTime.innerText = min_d + ':' + sec_d
// }

function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

let updateProgress = e => {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
function setProgress (e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    console.log(width)
    audio.currentTime = (clickX / width )* duration
    

}
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
// 给音乐播放器加一个设置当前时间和持续时间的功能
audio.addEventListener('timeupdate', DurTime)
audio.addEventListener('ended', nextSong)

