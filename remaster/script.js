const navi = document.querySelector('.navi')
const hamburger = document.querySelector('.hamburger')
const dots = document.querySelector('#dots')
const icons = document.querySelector(".icons")


navi.addEventListener('click', expand)

function expand() {
    navi.classList.add('expanded')
    setTimeout(() => {
        navi.classList.add('navbar')
        navi.classList.remove('expanded', 'hamburger')
        navi.removeEventListener('click', expand, false)
        icons.style.visibility = "visible"
    }, 1250)
}

dots.addEventListener('click', (e) => {
    e.stopPropagation()
    navi.classList.remove('navbar', 'expanded')
    navi.classList.add('hamburger')
})
