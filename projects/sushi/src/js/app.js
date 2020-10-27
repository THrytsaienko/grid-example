document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menu-toggle');
    const header = document.getElementById('header');
    const background = document.querySelector('.header__background');
    btn.addEventListener('click', () => {
        const isActive = header.classList.contains('active');
        if (isActive) {
            header.classList.remove('active');
            background.style.display = 'none';
        } else {
            header.classList.add('active');
            background.style.display = 'block';
        }
    });
});