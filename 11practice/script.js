const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const delBtn = document.getElementById('del')
// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
let cardsEl = [];


const getCardsData = () => {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards == null ? [] : cards;
}
// Store card data
let cardsData = getCardsData();

const createCards = () => {
    if (cardsData.length === 0) {
        const blank = {
            question: '空白',
            answer: '空白',

        }
        createCard(blank, 0)
    }
    cardsData.forEach((card, index) =>
        createCard(card, index)
    );
}

const createCard = (data, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    if (index == 0) {
        card.classList.add('active')
    }
    card.innerHTML = `
    <div class='inner-card'>
    <div class='inner-card-front'>
    <p>${data.question}</p>
    </div>
    <div class='inner-card-back'>
    <p>${data.answer}</p>
    </div>
    </div>    
    `;
    card.addEventListener('click', () => {
        card.classList.toggle('show-answer');
    })
    cardsEl.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
}

const updateCurrentText = () => {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}



const setCardsData = (card) => {
    localStorage.setItem('cards', JSON.stringify(card));
    window.location.reload();//刷新页面
}

createCards();

const next=()=>{
    cardsEl[currentActiveCard].className = 'card left'
    currentActiveCard += 1
    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1
    }
    cardsEl[currentActiveCard].className = 'card active'
    updateCurrentText()
}
const prev=()=>{
    cardsEl[currentActiveCard].className = 'card left'
    currentActiveCard -= 1
    if (currentActiveCard < 0) {
        currentActiveCard = 0
    }
    cardsEl[currentActiveCard].className = 'card active'
    updateCurrentText()
}
const jump=(index)=>{
    cardsEl[index].className = 'card active'
    updateCurrentText()
}

nextBtn.addEventListener('click', next)

prevBtn.addEventListener('click', prev)
showBtn.addEventListener('click', () => addContainer.classList.add('show'))
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'))

addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    const index = cardsData.length;
    if (question.trim() && answer.trim()) {
        const newCard = {
            question, answer, index
        }
        createCard(newCard);
        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');
        cardsData.push(newCard)
        setCardsData(cardsData)
    }
})

delBtn.addEventListener('click', () => {
    if (currentActiveCard == 0 && cardsData.length == 1) {
        clear()
    } else {
        if (currentActiveCard == 0) {
            cardsData.shift();
        } else if (currentActiveCard == cardsData.length - 1) {
            cardsData.pop();
            currentActiveCard=currentActiveCard-1;          
        } else {
            cardsData = cardsData.splice(currentActiveCard, 1);
        }
        setCardsData(cardsData);
        createCards();
        next();
    }
})

const clear = () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload()
}

clearBtn.addEventListener('click', clear)
console.log(questionEl.value)