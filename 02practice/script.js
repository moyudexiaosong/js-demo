const video = document.getElementById("video")
const stop = document.getElementById("stop")
const play = document.getElementById("play")
const progress = document.getElementById("progress")
const timestamp = document.getElementById("timestamp")


let toggleVideoStatus = () => {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
    }
}
let updatePlayIcon = () => {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

let huansuan = (time) => {
    let mins = Math.floor(time / 60)
    let secs = Math.floor(time % 60)
    if (mins < 10) {
        mins = '0' + String(mins)
    }
    if (secs < 10) {
        secs = '0' + String(secs)
    }
    return String(mins+':'+secs)
}
//currentTime单位为s，类型为number
let updateProgress = () => {
    //设置silbar的比值
    progress.value = (video.currentTime / video.duration) * 100
    let sTime = huansuan(video.currentTime)
    let eTime = huansuan(video.duration)
    timestamp.innerHTML = `${sTime}/${eTime}`
}
//设置进度条跳转
let setVideoProgress = () => {
    video.currentTime = Number(progress.value / 100 * video.duration)
}
//重启视频
let stopVideo = () => {
    video.currentTime = 0;
    video.pause()
}
video.addEventListener('click', toggleVideoStatus)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)

play.addEventListener('click', toggleVideoStatus)
stop.addEventListener('click', stopVideo)
progress.addEventListener('change', setVideoProgress)