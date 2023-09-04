const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');



const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
)

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const addTransition = (e) => {
    e.preventDefault()
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('请输入记录')
    } else {
        const transaction = {
            id: Math.floor(Math.random() * 100000000),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction)
        addTransactionDOM(transaction)
        updateValues()
        updateLocalStorage()
        text.value = ''
        amount.value = ''
    }
}
const addTransactionDOM = (transaction) => {
    const sign = transaction.amount > 0 ? '+' : '-'
    const item = document.createElement('li')
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus')
    item.innerHTML = `
    ${transaction.text} 
    <span>
    ${sign}${Math.abs(
        transaction.amount)}
    </span> 
    <button class="delete-btn" 
    onclick="removeTransaction(
        ${transaction.id})">x</button>
  `;
    list.appendChild(item)


}

const updateValues = () => {
    // const total = transactions.reduce((prev, cur) => {
    //     prev += cur.amount
    //     alert(prev)
    // }, 0)
    // balance.innerHTML = `$${total.toFixed(2)}`
    // const incomes = transactions.reduce((prev, cur) => {
    //     if (cur.amount > 0) {
    //         prev += cur.amount
    //     }
    // }, 0)
    // money_plus.innerHTML = `$${incomes.toFixed(2)}`
    // const expense = transactions.reduce((prev, cur) => {
    //     if (cur.amount < 0) {
    //         prev += cur.amount
    //     }
    // }, 0)
    // money_minus.innerHTML = `$${expense.toFixed(2)}`
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

const removeTransaction = (id) => {
    transactions = transactions.filter(item => item.id !== id)
    updateLocalStorage()
    init()
}
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
const init = () => {
    list.innerHTML = ''
    transactions.forEach(item => {
        addTransactionDOM(item)
    })
    updateValues()
}

init()
form.addEventListener('submit', addTransition)