// Html references
const formLogin = document.querySelector('#form-login');
const error = document.querySelector('#error');

const loginUser = async (e = Event) => {
    e.preventDefault();

    const formData = new FormData(formLogin);
    const data = Object.fromEntries(formData);

    const response = await fetch('/auth/login', {
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
        formLogin.reset();
        window.location = 'animals.html';
    }
};

const main = () => {
    formLogin.addEventListener('submit', loginUser);
};

document.addEventListener('DOMContentLoaded', () => {
    main();
});