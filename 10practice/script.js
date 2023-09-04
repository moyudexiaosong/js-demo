const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');

const searchMeal = e => {
    e.preventDefault();
    single_mealEl.innerHTML = '';
    mealsEl.innerHTML = '';
    const term = search.value;
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json()).then(data => {
                console.log(data)
                if (data.meals === null) {
                    resultHeading.innerHTML = `<div>${term}的搜索结果为空，请重试</div>`;
                } else {
                    resultHeading.innerHTML = `<div>${term}的搜索结果共${data.meals.length}条</div>`;
                    mealsEl.innerHTML = data.meals.map(meal =>
                        `<div class='meal'>
                    <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
                    <div class='meal-info' data-mealID='${meal.idMeal}'>
                    <h3>${meal.strMeal}</h3>
                    </div>
                    </div>`
                    ).join('')

                }
            })
        search.value = '';
    } else {
        alert('输点东西进去吧')
    }
}

const getMealById = (mealID) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal)
        })
}

const getRandomMeal = () => {
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
}
const addMealToDOM = (meal) => {
    single_mealEl.innerHTML = '';
    mealsEl.innerHTML = '';
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredients${i}`]) {
            ingredients.push(
                `${meal[`strIngredients${i}`]} - ${meal[`strMeature${i}`]}`
            );
        } else {
            break;
        }
    }

    single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
    `;
}
submit.addEventListener('submit', searchMeal)
random.addEventListener('click', getRandomMeal)
mealsEl.addEventListener('click', e => {
    const el=e.target.getAttribute('data-mealid');
    console.log(el);
    getMealById(el)
})