const difficulty = document.getElementsByName('difficulty')
const time = document.getElementById('time')
const score = document.getElementById('score')
const again = document.getElementById('end-game-container')
const text = document.getElementById('text')
const word = document.getElementById('word')
const setbtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const start = document.getElementById('start-btn')

let flag = false
let typeWord

let diff = localStorage.getItem('rate') !== null ? localStorage.getItem('rate') : getDifficulty()
difficulty.forEach((item)=>{
    if(item.value==diff){
        item.checked=true
    }
})


function setDifficulty(diff) {
    switch (diff) {
        case 'easy':
            time.innerText = '30'
            break
        case 'medium':
            time.innerText = '20'
            break
        case 'hard':
            time.innerText = '10'
            break
    }
}

function getDifficulty() {
    const rate = [...difficulty].find(item => item.checked == true)
    setDifficulty(rate.value)
    return rate.value
}
function load() {
    if(flag==true){
        time.innerText = +time.innerText - 1
    }
    
    if (time.innerText == '0') {
        gameOver()
    }

}
function changeWord() {
    const rand = Math.floor(Math.random() * 10) + 1
    let type = []
    for (let i = 0; i <= rand; i++) {
        let char = String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt(0))
        type.push(char)
    }
    typeWord = type.join('')
    console.log(typeWord)
    word.innerText = typeWord
}

function checkWord() {
    if (text.value == typeWord) {
        text.value = ""
        score.innerText = +score.innerText + 1
        changeWord()
    }
}

function gameOver() {
    clearInterval(timeInterval)
    again.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  localStorage.setItem('rate',diff)

    again.style.display = 'flex';
}


changeWord()
text.addEventListener('input', checkWord)

difficulty.forEach(item => {
    item.addEventListener('change', () => {
        let rate = getDifficulty()
        localStorage.setItem('rate', rate)
    })
})


setbtn.addEventListener('click', () => {
    settings.classList.toggle('hide')
})

const timeInterval = setInterval(() => {
    load()
}, 1000);

start.addEventListener('click',()=>{
    flag=true
    
})
