const navi = document.querySelector('.navi')
const hamburger = document.querySelector('.hamburger')
const dots = document.querySelector('#dots')

navi.addEventListener('click', (e) => {
    navi.classList.remove('hamburger')
    navi.classList.add('navbar')
})

dots.addEventListener('click', (e) => {
    e.stopPropagation()
    navi.classList.remove('navbar')
    navi.classList.add('hamburger')
})
