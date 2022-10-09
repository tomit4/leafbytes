window.onload = loadPage()
window.onload = loadTitle()

/* navbar elements */
const navi = document.querySelector('.navi')
const hamburger = document.querySelector('.hamburger')
const icons = document.getElementsByClassName('icons')
const dots = document.getElementsByClassName('dots')

/* circuit animation elements */
const circuitOuter = document.querySelector('.circuit-outer')
const circuitInner = document.querySelector('.circuit-inner')
const current = document.querySelector('.current')

/* title elements */
const leafbytes = document.querySelector('.leafbytes')
const subtitle = document.querySelector('.subtitle')

/* on page load animation */

/* extremely useful wait() function */
function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

async function loadPage() {
    await wait(500)
    circuitOuter.classList.add('loadfade')
    circuitInner.classList.add('loadfade')
    current.classList.add('loadfade')
    // return expand()
}

async function loadTitle() {
    await wait(2400)
    console.log('loadTitle invoked')
    leafbytes.classList.add('loadtitlefade')
    subtitle.classList.add('loadtitlefade')
    await wait(250)
    return expand()
}

/* icon scale up */
function scaleUp(e) {
    const selectedIcon = document.getElementById(e.id)
    for (let i = 0; i < icons.length; i++) {
        /* see MDN article on DOMTokenList for contains documentation */
        if (icons[i].classList.contains('scaled')) {
            icons[i].classList.remove('scaled')
        } else
            selectedIcon.classList.toggle('scaled')
    }
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
