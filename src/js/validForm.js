const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const message = document.getElementById('message');
const modal = document.querySelector('modal');
const popUp = document.querySelector('popUp');

const data = {
    name: username.value,
    email: email.value,
    message: message.value,
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = JSON.stringify(data);

    let error = validateInputs();

    if (error === 3) {
        sendData('https://6419d642f398d7d95d4ac24f.mockapi.io/sneakers', formData);
        form.style.display = 'none';
        popUp.style.display = 'block';

        setTimeout(() => {
            popUp.classList.remove('active');
            modal.style.display = 'none';
        }, 2000);
    }
});

const sendData = async (url, formData) => {
    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`статус ошибки ${response.status}`);
    }

    return await response.json();
};

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();
    let error = 0;

    if (usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
        error++;
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
        error++;
    }

    if (messageValue === '') {
        setError(message, 'message is required');
    } else if (messageValue.length < 10) {
        setError(message, 'message must be at least 10 character.');
    } else {
        setSuccess(message);
        error++;
    }

    return error;
};
