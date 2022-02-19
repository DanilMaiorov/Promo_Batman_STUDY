const header = document.querySelector('.header')
const burgerOpen = document.querySelector('.menu-burger')

burgerOpen.addEventListener('click', () => {
    header.style.display = 'block'
})

header.addEventListener('click', (e) => {
    if(e.target.closest('.header__menu-close')) {
        header.style.display = 'none'
    }
})