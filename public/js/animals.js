// HTML references
const totalAnimals = document.querySelector('.small-text');
const ulAnimals = document.querySelector('#animals');
const formAnimals = document.querySelector('#form-animals');
const error = document.querySelector('#error');
const success = document.querySelector('#success');

let jwt = '';

const getAnimals = async () => {
    const result = await fetch('/animals', {
        headers: {
            'Authorization': jwt
        }
    });

    const { total, animals } = await result.json();

    drawAnimals(total, animals);

    const aButtonDelete = ulAnimals.querySelectorAll('li > button');

    for (const buttonDelete of aButtonDelete) {
        buttonDelete.addEventListener('click', deleteAnimal);
    }
};

const drawAnimals = (total, animals) => {
    ulAnimals.innerHTML = '';

    totalAnimals.textContent = total;

    for (const animal of animals) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');

        li.innerHTML = `${animal.name} - ${animal.type}`;
        li.innerHTML += ` <button data-id="${animal._id}" class="btn btn-outline-danger btn-sm">Delete</button>`

        ulAnimals.append(li);
    }
};

const addAnimal = async e => {
    e.preventDefault();

    const formData = new FormData(formAnimals);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/animals', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt
            }
        });

        const { msg } = await response.json();

        if (response.status > 300) {
            error.textContent = msg;
        } else {
            await getAnimals();
    
            success.textContent = msg;
            formRegister.reset();
        }

    } catch (error) {
        console.log('addAnimal - error: ', error);
    }
};

const deleteAnimal = async e => {
    const { id } = e.target.dataset;

    const response = await fetch(`/animals/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': jwt
        }
    });

    const { msg } = await response.json();

    if (response > 300) {
        error.textContent = msg;
    } else {
        success.textContent = msg;
        e.target.parentNode.remove();

        totalAnimals.textContent = ulAnimals.querySelectorAll('li > button').length;
    }
};

const checkLogin = async () => {
    jwt = localStorage.getItem('jwt');

    const response = await fetch(`/auth`, {
        headers: {
            'Authorization': jwt
        }
    });

    if (response.status > 300) {
        return false;
    }

    return true;
};

const main = async () => {

    const isLogged = await checkLogin();

    if (isLogged) {
        await getAnimals();
    
        formAnimals.addEventListener('submit', addAnimal);
    } else {
        window.location = 'login.html';
        return;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    main();
});