const navi = document.querySelector('.navi')
const hamburger = document.querySelector('.hamburger')
const icons = document.getElementsByClassName('icons')
const dots = document.getElementsByClassName('dots')

/* icon scale up */
function scaleUp(e) {
    const selectedIcon = document.getElementById(e.id)
    selectedIcon.classList.toggle('scaled')
    /* check if other icons have been hit, and if so,
     * remove scaled class from all icons except for one recently clicked */
}

/* navbar expansion/contraction */
navi.addEventListener('click', expand)

function expand() {
    navi.classList.add('expanded')
    setTimeout(() => {
        navi.classList.add('navbar')
        navi.classList.remove('expanded', 'hamburger')
        navi.removeEventListener('click', expand, false)

        for (let i = 0; i < icons.length; i++) {
            icons[i].style.visibility = 'visible'
            icons[i].classList.add('fade-in')
        }

        for (let j = 0; j < dots.length; j++) {
            dots[j].style.visibility = 'visible'
            dots[j].classList.add('fade-in')
            addDotEvents(j)
        }
    }, 1250)
}

function addDotEvents(j) {
    dots[j].addEventListener('click', e => {
        e.stopPropagation()
        navi.addEventListener('click', expand)

        for (let i = 0; i < icons.length; i++) {
            icons[i].style.visibility = 'hidden'
            icons[i].classList.remove('fade-in', 'scaled')
        }
        for (let j = 0; j < dots.length; j++) {
            dots[j].style.visibility = 'hidden'
            dots[j].classList.remove('fade-in', 'scaled')
        }

        navi.classList.add('retracted')
        setTimeout(() => {
            navi.classList.remove('navbar')
            navi.classList.add('hamburger')
            navi.classList.remove('retracted')
        }, 1250)
    })
}
