const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear=new Date().getFullYear();

const newYearTime=new Date(`January 01 ${currentYear+1} 00:00:00`)

year.innerText=currentYear+1

const updateCountdown=()=>{
    const currentTime=new Date()
    // diff单位为ms
    const diff=newYearTime-currentTime
    const s=Math.floor(diff/1000%60)
    const m=Math.floor(diff/1000/60%60)
    const h=Math.floor(diff/1000/60/60%24)
    const d=Math.floor(diff/1000/60/60/24)

    days.innerText=d
    hours.innerText=h<10?'0'+h:h
    minutes.innerText=m?'0'+m:m
    seconds.innerText=s?'0'+s:s
}
// 0.5s后移除加载项
setTimeout(()=>{
    loading.remove();
    countdown.style.display='flex'
},500)

setInterval(updateCountdown,1000)