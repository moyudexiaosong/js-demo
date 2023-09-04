const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
        image: 'https://w.wallhaven.cc/full/o5/wallhaven-o5lkx7.png',
        text: "I'm Thirsty"
    },
    {
        image: 'https://w.wallhaven.cc/full/2y/wallhaven-2y322g.jpg',
        text: "I'm Hungry"
    },
    {
        image: 'https://w.wallhaven.cc/full/d6/wallhaven-d6e95l.jpg',
        text: "I'm Tired"
    },
    {
        image: 'https://w.wallhaven.cc/full/d6/wallhaven-d6w5lj.jpg',
        text: "I'm Hurt"
    },
    {
        image: 'https://w.wallhaven.cc/full/yx/wallhaven-yxv877.jpg',
        text: "I'm Happy"
    },
    {
        image: 'https://w.wallhaven.cc/full/rr/wallhaven-rrjg67.png',
        text: "I'm Angry"
    },
    {
        image: 'https://w.wallhaven.cc/full/1p/wallhaven-1pr88v.jpg',
        text: "I'm Sad"
    },
    {
        image: 'https://w.wallhaven.cc/full/3l/wallhaven-3lr3j6.jpg',
        text: "I'm Scared"
    },
    {
        image: 'https://w.wallhaven.cc/full/1p/wallhaven-1px9k9.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: 'https://w.wallhaven.cc/full/m3/wallhaven-m32g5k.png',
        text: 'I Want To Go Home'
    },
    {
        image: 'https://w.wallhaven.cc/full/d6/wallhaven-d6w2dj.png',
        text: 'I Want To Go To School'
    },
    {
        image: 'https://w.wallhaven.cc/full/o5/wallhaven-o5lzx7.jpg',
        text: 'I Want To Go To Grandmas'
    }
];
data.forEach(createBox)

function createBox(item) {
    const box = document.createElement('div')
    const { image, text } = item
    box.classList.add('box')
    box.innerHTML = `
    <img class='fit' src='${image}' alt='${text}'>
    <p class='info'>${text}</p>
    `
    box.addEventListener('click', () => {
        setTextMsg(text)
        box.classList.add('active')
        speakText()
        setTimeout(() => box.classList.remove('active'), 800)
    })
    main.appendChild(box)
}
const message = new SpeechSynthesisUtterance()
message.rate = 0.5
message.pitch = 0

let voices = []

const getVoices = () => {
    voices = speechSynthesis.getVoices()
    voices.forEach(voice => {
        const option = document.createElement('option')
        option.value = voice.name
        option.innerText = `${voice.name} ${voice.lang}`
        voicesSelect.appendChild(option)

    })
}

const setTextMsg = text => {
    message.text = text
}

const speakText = () => {
    speechSynthesis.speak(message)
}

const setVoices = e => {
    message.voice = voices.find(voice => voice.name === e.target.value)
}

speechSynthesis.addEventListener('voiceschanged', getVoices)
closeBtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.remove('show')
);

toggleBtn.addEventListener('click', () => {
    document.getElementById('text-box').classList.toggle('show')
})

voicesSelect.addEventListener('change', setVoices)
readBtn.addEventListener('click', () => {
    setTextMsg(textarea.value)
    speakText()
})

getVoices()