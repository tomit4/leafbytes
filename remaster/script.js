window.onload = loadPage()
window.onload = loadTitle()
window.onload = removeTitle()

/* selector for the entire html body */
const body = document.querySelector('body')

/* selectors of HTML elements by tag name */
const li = document.getElementsByTagName('li')


/* navbar elements */
const navi = document.querySelector('.navi')
const hamburger = document.querySelector('.hamburger')
const icons = document.getElementsByClassName('icons')
const dots = document.getElementsByClassName('dots')

/* individual icon elements */
const homeIcon = document.getElementById('home')

/* circuit animation elements */
const circuitOuter = document.querySelector('.circuit-outer')
const circuitInner = document.querySelector('.circuit-inner')
const current = document.querySelector('.current')

/* title elements */
const leafbytes = document.querySelector('.leafbytes')
const subtitle = document.querySelector('.subtitle')

/* article elements */
let article = document.querySelector('.article')

/* footer elements */
const foot = document.querySelector('.foot')
const footerIcons = document.getElementsByClassName('footer-icons')

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
    await wait(2900)
    leafbytes.classList.add('loadtitlefade')
    subtitle.classList.add('loadtitlefade')
    await wait(500)
    return expand()
}

async function removeTitle() {
    await wait(5000)
    leafbytes.classList.remove('loadtitlefade')
    subtitle.classList.remove('loadtitlefade')
    leafbytes.classList.add('loadtitlefadeout')
    subtitle.classList.add('loadtitlefadeout')
    circuitOuter.classList.add('loadtitlefadeout')
    await wait (1600)
    leafbytes.remove()
    subtitle.remove()
    circuitOuter.remove()
    addArticleDiv()
    homeIcon.classList.add('scaled')
}

function addArticleDiv() {
    article = document.createElement('div')
    article.classList.add('article')
    article.innerHTML = "<h1>This is a test</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"
    body.insertBefore(article, foot)
    activateScrollBehavior()
}

function activateScrollBehavior() {
    let scrollPosition = 0
    article.addEventListener('scroll', () => {
        let sTop = article.scrollTop
        // scrolling down
        if (sTop > scrollPosition) {
            activateScrollDown()
        // scrolling up
        } else {
            activateScrollUp()

        }
        scrollPosition = sTop <= 0 ? 0 : sTop
    }, false)
}

function activateScrollDown() {
    for (let i = 0; i < icons.length; i++) {
                icons[i].style.visibility = "hidden"
    }
    for (let j = 0; j < dots.length; j++) {
                dots[j].style.visibility = "hidden"
    }
    for (let k = 0; k < footerIcons.length; k++) {
                footerIcons[k].style.visibility = "hidden"
    }

    // possibly add check for if classList already
    // contains/includes these classes (is more efficient???)
    navi.classList.add('navbar-onscrolldown')
    foot.classList.add('foot-onscrolldown')
    article.classList.add('article-onscrolldown')

    // remove onscrollup classes here
    navi.classList.remove('navbar-onscrollup')
    foot.classList.remove('foot-onscrollup')
    article.classList.remove('article-onscrollup')
}

async function activateScrollUp() {
            // onscrollup animations
            navi.classList.add('navbar-onscrollup')
            foot.classList.add('foot-onscrollup')
            article.classList.add('article-onscrollup')

            // await wait() for these based off of scrollup animations
            navi.classList.remove('navbar-onscrolldown')
            foot.classList.remove('foot-onscrolldown')
            article.classList.remove('article-onscrolldown')

            await wait(1200)
            for (let i = 0; i < icons.length; i++) {
                icons[i].style.visibility = "visible"
            }
            for (let j = 0; j < dots.length; j++) {
                dots[j].style.visibility = "visible"
            }
            for (let k = 0; k < footerIcons.length; k++) {
                footerIcons[k].style.visibility = "visible"
            }

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
