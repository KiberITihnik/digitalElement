let btns = document.querySelectorAll('*[data-modal-btn]');
let html = document.documentElement;
let scrollPosition = window.pageYOffset;

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
        let name = btns[i].getAttribute('data-modal-btn');

        let modal = document.querySelector("[data-modal-window='" + name + "']");
        modal.style.display = 'block';

        let close = modal.querySelector('.close_modal_window');
        close.addEventListener('click', function () {
            modal.style.display = 'none';
            window.scrollTo(0, scrollPosition);
            html.style.top = '';
            html.style.position = 'static';
            html.style.overflow = 'visible';
        });
    });
}
window.onclick = function (e) {
    html.style.top = -scrollPosition + 'px';
    html.classList.add('modal__opened');

    if (e.target.hasAttribute('data-modal-window')) {
        let models = document.querySelectorAll('*[data-modal-window]');
        for (let i = 0; i < models.length; i++) {
            models[i].style.display = 'none';
        }
        html.classList.remove('modal__opened');
        window.scrollTo(0, scrollPosition);
        html.style.top = '';
    }
};
