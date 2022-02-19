
const modalOverlay = document.querySelector('.modal')
const modal = document.querySelector('.modal__inner')
const modalOpen = document.querySelector('.main__button-play')
const frame = document.querySelector('iframe')


function disableScrolling () {
    const x = window.scrollX
    const y = window.scrollY
    window.onscroll = function () {
        window.scrollTo(x, y) 
    }
}

modalOpen.addEventListener('click', () => {
    modal.style.display = 'block'
    modalOverlay.style.display = 'block'
    disableScrolling()
    frame.setAttribute('src', 'https://www.youtube.com/embed/tZeMfF45Gmc')
})

modalOverlay.addEventListener('click', () => {
    modal.style.display = 'none'
    modalOverlay.style.display = 'none'
    window.onscroll = function () {};
    frame.removeAttribute('src')
})