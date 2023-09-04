const currency_one = document.getElementById('currency-one')
const currency_two = document.getElementById('currency-two')
const amount_one = document.getElementById('amount-one')
const amount_two = document.getElementById('amount-two')
const rate = document.getElementById('rate')
const swapBtn = document.getElementById('swap')

const swap = () => {
    [currency_one.value, currency_two.value] = [currency_two.value, currency_one.value]
    calculate()
}
const calculate=()=>{
    fetch("https://open.exchangerate-api.com/v6/latest").then(res=>res.json()).then(data=>{
        let rateNum=data.rates[currency_two.value]/data.rates[currency_one.value]
        rate.innerText=`1${currency_one.value} = ${rateNum}${currency_two.value}`
        amount_two.value=(amount_one.value*rateNum).toFixed(3)
    })
}
swapBtn.addEventListener('click', swap)
currency_one.addEventListener('change',calculate)
currency_two.addEventListener('change',calculate)
amount_one.addEventListener('change',calculate)

calculate()