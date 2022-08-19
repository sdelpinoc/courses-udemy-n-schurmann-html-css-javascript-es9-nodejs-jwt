// Html references
const formRegister= document.querySelector('#form-register');
const error = document.querySelector('#error');
const success = document.querySelector('#success');

const loginUser = async (e = Event) => {
    e.preventDefault();

    const formData = new FormData(formRegister);
    const data = Object.fromEntries(formData);

    const response = await fetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.status > 300) {
        error.textContent = responseData.msg;
    } else {
        localStorage.setItem('jwt', `Bearer ${responseData.jwt}`);
        success.textContent = responseData.msg;
        formRegister.reset();
    }
};

const main = () => {
    formRegister.addEventListener('submit', loginUser);
};

document.addEventListener('DOMContentLoaded', () => {
    main();
});