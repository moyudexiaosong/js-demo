const msgEl=document.getElementById('msg')
const randomNum=getRandomNum()

window.SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition

let recognition=new window.SpeechRecognition();
// 启动语音识别
recognition.start()

// const onSpeak

const writeMsg=msg=>{
    msgEl.innerHTML=`
    <div>你说的是：</div>
    <span class='box'>${msg}</span>
    `
}

const getRandomNum=()=>{
    return Math.floor(Math.random()*100)+1
}

const checkNum=msg=>{
    const num=+msg

    if(Number.isNaN(num)){
        msgEl.innerHTML+='<div>这不是一个合法输入</div>'
        return
    }

    if(num>100||num<1){
        msgEl.innerHTML+='<div>输入必须在1-100之间</div>'
        return
    }

    if(num===randomNum){
        document.body.innerHTML=`
        <h2>恭喜你！猜对啦！<br><br>
        正确答案就是${num}
        </h2>
        <button class='play-again' id='play-again'>再猜一次</button>

        `
    }else if(num>randomNum){
        msgEl.innerHTML+='<div>猜大了</div>'
    }else{
        msgEl.innerHTML+='<div>猜小了</div>'
    }
}

const onSpeak=e=>{
    const msg=e.results[0][0].transcript
    writeMsg(msg)
    checkNum(msg)
}

recognition.addEventListener('result',onSpeak)
recognition.addEventListener('end',()=>recognition.start())

document.body.addEventListener('click',e=>{
    if(e.target.id='play-again'){
        window.location.reload()
    }
})