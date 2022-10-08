const navi = document.querySelector('.navi')
const hamburger = document.querySelector('.hamburger')
// const dots = document.querySelector('.dots')
const icons = document.getElementsByClassName("icons")
const dots = document.getElementsByClassName("dots")


navi.addEventListener('click', expand)

function expand() {
    navi.classList.add('expanded')
    setTimeout(() => {
        navi.classList.add('navbar')
        navi.classList.remove('expanded', 'hamburger')
        navi.removeEventListener('click', expand, false)
        for (let i = 0; i < icons.length; i++) {
            icons[i].style.visibility = "visible"
        }
        for (let j = 0; j < dots.length; j++) {
            dots[j].style.visibility = "visible"
            addDotEvents(j)
        }
    }, 1250)
}

function addDotEvents(j) {
    dots[j].addEventListener('click', (e) => {
        e.stopPropagation()
        navi.addEventListener('click', expand)
        for (let i = 0; i < icons.length; i++) {
                icons[i].style.visibility = "hidden"
        }
        for (let j = 0; j < dots.length; j++) {
            dots[j].style.visibility = "hidden"
        }
        navi.classList.add('retracted')
        setTimeout(() => {
            navi.classList.remove('navbar')
            navi.classList.add('hamburger')
            navi.classList.remove('retracted')
        }, 1250)
    })
}
