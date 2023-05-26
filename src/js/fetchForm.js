'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', handleFormSubmit);

    function serializeForm(formNode) {
        return new FormData(formNode);
    }

    function toggleLoader() {
        const loader = document.getElementById('loader');
        loader.classList.toggle('hidden');
    }

    function onSuccess(formNode) {
        alert('Ваша заявка отправлена!');
        formNode.classList.toggle('hidden');
    }
    function onError(error) {
        alert(error.message);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        const data = serializeForm(event.target);

        toggleLoader();

        const { status, error } = await sendData(data);
        toggleLoader();

        if (status === 200) {
            onSuccess(event.target);
        } else {
            onError(error);
        }
    }

    async function sendData(data) {
        return await fetch('/api/apply/', {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: data,
        });
    }
});
