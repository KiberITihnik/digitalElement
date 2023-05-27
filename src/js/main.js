let btns = document.querySelectorAll('*[data-modal-btn]');
const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
        let name = btns[i].getAttribute('data-modal-btn');

        let modal = document.querySelector("[data-modal-window='" + name + "']");
        modal.style.display = 'block';

        let close = modal.querySelector('.close_modal_window');
        close.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    });
}

window.onclick = function (e) {
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;

    if (e.target.hasAttribute('data-modal-window')) {
        let models = document.querySelectorAll('*[data-modal-window]');
        for (let i = 0; i < models.length; i++) {
            models[i].style.display = 'none';
        }
    }
};
