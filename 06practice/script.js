const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//获得input的父元素，将其样式设置为'form-control error'，也就是从不显示设置为显示
//并将其small元素的文本属性设置为msg
const showError = (input, msg) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = msg;
}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}
const checkEmail = (input) => {
    const regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regx.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, '邮箱格式不正确')
    }
}
const checkPassWordMatch = (inp1, inp2) => {
    if (inp1.value !== inp2.value) {
        showError(inp2, '密码不匹配')
    }
}
//首字母大写
const getFieldName = (inp) => {
    return inp.id.charAt(0).toUpperCase() + inp.id.slice(1);
}

const checkRequired = (inputArr) => {
    let isRequired = true;
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)}未输入`)
            isRequired = true
        } else {
            showSuccess(input)
        }
    }
    );
    return isRequired;
}
const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} 至少输入${min}位`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} 至多输入${max}位`)
    } else {
        showSuccess(input)
    }

}
form.addEventListener('submit', e => {
    e.preventDefault();
    if (checkRequired([username, email, password, password2])) {
        checkPassWordMatch(password, password2);
        checkLength(username, 3, 8);
        checkLength(password, 4, 10);
        checkEmail(email);
    }

})