const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['hang', 'male', 'baby', 'chatgpt', 'favorite'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctletters = [];
const wrongletters = [];
//将单词的每个字母拆分出来放进一个数组，并用map方法返回一个新数组
//新数组的每个元素是一个span标签，如果猜对了的话，这一位的span标签就是正确字母，如果不对的话，那就是一个空值
//将新数组用join方法连接为一个字符串，传给innerHTML让它显示出来
const displayWord = () => {
    wordEl.innerHTML = `
    ${selectedWord.split('').map(
        letter => `
        <span class='letter'>
        ${correctletters.includes(letter) ? letter : ''}
        </span>`
    ).join('')}
    `;
    //innerWord将显示的文本内容中的换行符删掉，得到字母拼好的字符
    const innerWord = wordEl.innerText.replace(/[ \n]/g, '')
    if (innerWord === selectedWord) {
        finalMessage.innerText = "恭喜你猜对啦！🎉🎉🎉🎊🎊🎊";
        finalMessageRevealWord.innerText = '';
        popup.style.display = 'flex';
        playable = false;

    }
}

const updataWrongLetterEl = () => {
    wrongLettersEl.innerHTML = `
        ${wrongletters.length >= 0 ? '<p>错误答案</p>' : ''}
        ${wrongletters.map(letter => `<span>${letter}</span>`).join('')}
    `;
    figureParts.forEach((part, index) => {
        const errors = wrongletters.length;
        if (index < errors) {
            part.style.display = 'flex'
        } else {
            part.style.display = 'none'
        }

    });
    if (wrongletters.length === figureParts.length) {
        finalMessage.innerText = '很遗憾你没猜对😝😝😝';
        finalMessageRevealWord.innerText = `正确答案是${selectedWord}`;
        popup.style.display = 'flex';
        playable = false;
    }
}

const showNotifycation = () => {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}

window.addEventListener('keydown', e => {
    if (playable) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const letter = e.key.toLowerCase();
            if (selectedWord.includes(letter)) {
                if (!correctletters.includes(letter)) {
                    correctletters.push(letter)
                    displayWord()
                } else {
                    showNotifycation()
                }
            } else {
                if (!wrongletters.includes(letter)) {
                    wrongletters.push(letter)
                    updataWrongLetterEl()
                } else {
                    showNotifycation()
                }
            }
        }
    }
})

playAgainBtn.addEventListener('click', () => {
    playable = true;
    correctletters.splice(0);
    wrongletters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updataWrongLetterEl();
    popup.style.display = 'none';

});
displayWord();
updataWrongLetterEl()

