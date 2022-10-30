"use strict"

window.addEventListener('load', () => {
    // console.log(icons)
    loadPage()
    loadTitle()
    removeTitle()
    determineIfAtDesktopDimensions()
    renderDesktopNavAndFoot(true)
    addArticleDivDesktop(true)
})

/* add if() that loadArticles(lastArticleIwasOn) upon resize, right now reloads home only*/
window.addEventListener('resize', () => {
    determineIfAtDesktopDimensions()
    if (isAtDesktopDimensions)
        initialPageLoad = true
        loadArticles(home)
    renderDesktopNavAndFoot(false)
    addArticleDivDesktop(false)
})

/* selector for the entire html body */
const body = document.querySelector('body')

/* all divs */
const divElements = document.getElementsByTagName('div')

/* selectors of HTML elements by tag name */
// const li = document.getElementsByTagName('li')

/* navbar elements */
const navi = document.querySelector('.navi')
const navBar = document.querySelector('.navbar')
const navBarOnScrollUp = document.querySelectorAll('.navbar-onscrollup')
const prompt = document.querySelector('.prompt')
const icons = document.querySelectorAll('.icons')

/* individual icon elements */
const homeIcon = document.getElementById('home')

/* circuit animation elements */
const circuitOuter = document.querySelector('.circuit-outer')
const circuitInner = document.querySelector('.circuit-inner')
const current = document.querySelector('.current')

/* title elements */
const leafbytes = document.querySelector('.leafbytes')
const subtitle = document.querySelector('.subtitle')

/* grab ul elements for generating html desktop navbar/footer */
const desktopMenuItems = document.querySelector('.desktop-menu-items')
const desktopFooterItems = document.querySelector('.desktop-footer-items')

/* article elements */
let article = document.querySelector('.article')
const leafbytesBody = document.querySelectorAll('.leafbytes-body')
const articleLinks= document.getElementsByClassName('article-links')
const linkItem= document.getElementsByClassName('link-item')

/* article inner elements */
const introHeader = document.getElementsByClassName('intro-header')
const articleHeader = document.getElementsByClassName('article-header')
const articleHeader3 = document.getElementsByClassName('article-header3')
const articleBody= document.getElementsByClassName('article-body')
const articleDesktop = document.getElementsByClassName('article-desktop')

/* footer elements */
const foot = document.querySelector('.foot')
const footerIcons = document.getElementsByClassName('footer-icons')
const footerMenuItems = document.getElementsByClassName('footer-menu-item')

/* flag that checks if at desktop dimensions */
let isAtDesktopDimensions = false
/* flag that checks if initalPageLoad is complete (i.e. loadArticles has loaded once)*/
let initialPageLoad = true

const navList = {
    'contact': contact,
    'about': about,
    'home': home,
    'comments': comments,
    'links': link
}

const footList = {
    'github': git,
    'linkedin': linkedin,
    'resume': resume,
}

/* extremely useful wait() function */
function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

/* simple bool @media check for 1920px x 980px */
function determineIfAtDesktopDimensions() {
    if (window.matchMedia('(min-width: 1920px)').matches &&
        window.matchMedia('(min-height: 980px)').matches)
        isAtDesktopDimensions = true
    else isAtDesktopDimensions = false
}

/* main function called onload and onresize that renders navbar/footer */
async function renderDesktopNavAndFoot(onInitialLoad) {
    let delay
    if (onInitialLoad) delay = 3000
    else delay = 0

    if (isAtDesktopDimensions) {
        clearPrevRenderedDesktopItems()
        resizeNavBar()
        renderDesktopNavItems()
        renderDesktopFootItems()

        await wait(delay)
        makeDesktopItemsVisible()
    } else {
        clearPrevRenderedDesktopItems()
        resizeNavBar()
    }
}

function clearPrevRenderedDesktopItems() {
    if (isAtDesktopDimensions) {
        if (!navi.classList.contains('navi-desktop')) {
            navi.classList.add('navi-desktop')
        }
        desktopMenuItems.innerHTML = ''
        desktopFooterItems.innerHTML = ''
    } else {
        if (navi.classList.contains('navi-desktop')) {
            navi.classList.remove('navi-desktop')
        }
        desktopMenuItems.innerHTML = ''
        desktopFooterItems.innerHTML = ''
    }
}

function resizeNavBar() {
    if (isAtDesktopDimensions) {
        navi.style.height = '4rem'
        if (navi.classList.contains('navbar-onscrollup')) {
            navBarOnScrollUp.forEach((i) => navBarOnScrollUp[i].style.height = '4rem')
        }
    } else {
        navi.style.height = '2.5rem'
        if (navi.classList.contains('navbar-onscrollup')) {
            navBarOnScrollUp.forEach((i) => navBarOnScrollUp[i].style.height = '2.5rem')
        }
    }
}

/* render the Desktop NavBar Menu Items, called in renderDesktopNavAndFoot() */
function renderDesktopNavItems() {
    for (let key in navList) {
        const node = document.createElement('li')
        node.classList.add('navbar-menu-item')
        node.id = `menu-${key}`
        node.innerHTML = `${key[0].toUpperCase()}${key.substring(1, key.length)}`
        node.addEventListener('click', (e) => {
            e.preventDefault()
            icons.forEach((icon) => {
                if (icon.id === key && !icon.classList.contains('scaled')) {
                    icon.classList.add('scaled')
                }
            })
            loadArticles(navList[key])
        })
        desktopMenuItems.appendChild(node)
    }
}

/* render the Desktop Footer Menu Items, called in renderDesktopNavAndFoot() */
function renderDesktopFootItems() {
    for (let key in footList) {
        const node = document.createElement('li')
        node.classList.add('footer-menu-item')
        node.id = `foot-${key}`
        node.innerHTML = `${key[0].toUpperCase()}${key.substring(1, key.length)}`
        desktopFooterItems.appendChild(node)
    }
}

function makeDesktopItemsVisible() {
    const navBarMenuItem = document.querySelectorAll('.navbar-menu-item')
    navBarMenuItem.forEach((menuItem) => menuItem.classList.add('fade-in'))

    for (let i = 0; i < footerMenuItems.length; i++) {
        footerMenuItems[i].style.visibility = "visible"
        footerMenuItems[i].classList.add('fade-in')
    }
}

async function loadPage() {
    await wait(500)
    circuitOuter.classList.add('loadfade')
    circuitInner.classList.add('loadfade')
    current.classList.add('loadfade')
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
    await loadArticles(home)
    homeIcon.classList.add('scaled')
    for (let i = 0; i < icons.length; i++) {
        icons[i].classList.remove('fade-in')
    }
}

async function loadArticles(e) {
    if (initialPageLoad) await addArticleDiv()
    initialPageLoad = false
    scaleUp(e)
    await fetch(`./${e.id}.html`)
        .then((res) => {
            return res.text()
        })
        .then((async (html) => {
            if (isAtDesktopDimensions) {
                if (`${e.id}` === 'home') {
                    // replace about.html with a welcome page only visible from desktop site
                    await fetch('./about.html')
                        .then((res) => {
                            return res.text()
                        })
                        .then((html) => {
                            for (let i = 0; i < articleDesktop.length; i++) {
                                articleDesktop[i].innerHTML = html
                            }
                        })
                } else {
                    for (let i = 0; i < articleDesktop.length; i++) {
                        articleDesktop[i].innerHTML = html
                    }
                }
                if (article.innerHTML === '') {
                    await fetch('./home.html')
                        .then((res) => {
                            return res.text()
                        })
                        .then((html) => {
                            article.innerHTML = html
                        })
                }
            }
            else {
                article.innerHTML = html
                for (let i = 0; i < articleDesktop.length; i++) {
                    body.removeChild(articleDesktop[i])
                }
            }
            window.Prism.highlightAll()
        }))

    // window.history.pushState({}, '', `${window.location.origin}/${e.id}`)
}

async function addArticleDivDesktop(onInitialLoad) {
    if (onInitialLoad) await wait(7000)
    if (isAtDesktopDimensions) {
        for (let i = 0; i < divElements.length; i++) {
            if (divElements[i].classList.contains('article-desktop')) return
        }
        const node = document.createElement('div')
        node.classList.add('article-desktop')
        body.insertBefore(node, foot)
        // replace about.html with a welcome page only visible from desktop site
        await fetch('./about.html')
            .then((res) => {
                return res.text()
            })
            .then((html) => {
                for (let i = 0; i < articleDesktop.length; i++) {
                    articleDesktop[i].innerHTML = html
                }
        })
    } else {
        for (let i = 0; i < articleDesktop.length; i++) {
            body.removeChild(articleDesktop[i])
        }
    }
    activateScrollBehavior(articleDesktop)
}

function addArticleDiv() {
    if (document.body.contains(article)) {
        document.body.removeChild(article)
    }
    article = document.createElement('div')
    article.classList.add('article')
    body.insertBefore(article, foot)
    activateScrollBehavior(article)
}

async function renderIt(articleId) {
    await fetch(`./articles/tech/${articleId}.html`)
        .then((res) => {
            return res.text()
        })
        .then((async (html) => {
            if (isAtDesktopDimensions) {
                for (let i = 0; i < articleDesktop.length; i++) {
                    articleDesktop[i].innerHTML = html
                }
            }
            else {
                await wait(1000)
                article.innerHTML = html
                for (let i = 0; i < articleDesktop.length; i++) {
                    body.removeChild(articleDesktop[i])
                }
            }
            window.Prism.highlightAll()
        }))
    // window.history.pushState({}, '', `${window.location.origin}/articles/tech/${articlesId}`)
}

function renderArticle(articleId) {
    if (!isAtDesktopDimensions) {
        leafbytesBody.forEach((bodyElem) => bodyElem.classList.add('leafbytes-fadeout-content')
        )
        for (let i = 0; i< articleLinks.length; i++) {
            articleLinks[i].classList.add('leafbytes-fadeout-content')
        }
        for (let i = 0; i< linkItem.length; i++) {
            linkItem[i].classList.add('leafbytes-fadeout-content')
        }
    }
    renderIt(articleId)
}

async function renderNext(articleId) {
    for (let i = 0; i < introHeader.length; i++) {
        introHeader[i].classList.add('leafbytes-fadeout-content2')
    }
    for (let i = 0; i < articleBody.length; i++) {
        articleBody[i].classList.add('leafbytes-fadeout-content2')
    }
    if (!isAtDesktopDimensions) {
        for (let i = 0; i < articleHeader.length; i++) {
            articleHeader[i].classList.add('leafbytes-fadeout-content2')
        }
        for (let i = 0; i < articleHeader3.length; i++) {
            articleHeader3[i].classList.add('leafbytes-fadeout-content2')
        }
    }
    articleId = `tech-subject-${articleId + 1}`
    renderIt(articleId)
}

async function renderPrev(articleId) {
    for (let i = 0; i < introHeader.length; i++) {
        introHeader[i].classList.add('leafbytes-fadeout-content2')
    }
    for (let i = 0; i < articleBody.length; i++) {
        articleBody[i].classList.add('leafbytes-fadeout-content2')
    }
    if (!isAtDesktopDimensions) {
        for (let i = 0; i < articleHeader.length; i++) {
            articleHeader[i].classList.add('leafbytes-fadeout-content2')
        }
        for (let i = 0; i < articleHeader3.length; i++) {
            articleHeader3[i].classList.add('leafbytes-fadeout-content2')
        }
    }
    articleId = `tech-subject-${articleId - 1}`
    renderIt(articleId)
}

function activateScrollBehavior(articleDiv) {
    let scrollPosition = 0
    if (articleDiv === article) {
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
    } else if (articleDiv === articleDesktop) {
        for (let i = 0; i < articleDesktop.length; i++) {
            articleDesktop[i].addEventListener('scroll', () => {
                let sTop = articleDesktop[i].scrollTop
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
    }
}

async function activateScrollDown() {
    icons.forEach((icon) => {
        icon.style.visibility = 'hidden'
        icon.classList.remove('fade-in')
    })
    for (let k = 0; k < footerIcons.length; k++) {
        footerIcons[k].style.visibility = 'hidden'
        footerIcons[k].classList.remove('fade-in')
    }

    for (let j = 0; j < footerMenuItems.length; j++) {
        footerMenuItems[j].style.visibility = 'hidden'
        footerMenuItems[j].classList.remove('fade-in')
    }

    // add onscrollup classes here
    navi.classList.add('navbar-onscrolldown')
    foot.classList.add('foot-onscrolldown')
    article.classList.add('article-onscrolldown')
    if (isAtDesktopDimensions) {
        for (let i = 0; i < articleDesktop.length; i++) {
            articleDesktop[i].classList.add('article-onscrolldown')
        }
    }

    // remove onscrollup classes here
    desktopMenuItems.innerHTML = ''
    navi.style.height = '0'
    navi.classList.remove('navbar-onscrollup')
    foot.classList.remove('foot-onscrollup')
    article.classList.remove('article-onscrollup')
    if (isAtDesktopDimensions) {
        for (let i = 0; i < articleDesktop.length; i++) {
            articleDesktop[i].classList.remove('article-onscrollup')
        }
    }

}

async function activateScrollUp() {
    // onscrollup animations
    navi.classList.add('navbar-onscrollup')
    foot.classList.add('foot-onscrollup')
    article.classList.add('article-onscrollup')
    if (isAtDesktopDimensions) {
        for (let i = 0; i < articleDesktop.length; i++) {
            articleDesktop[i].classList.add('article-onscrollup')
        }
    }

    navi.classList.remove('navbar-onscrolldown')
    foot.classList.remove('foot-onscrolldown')
    article.classList.remove('article-onscrolldown')
    if (isAtDesktopDimensions) {
        for (let i = 0; i < articleDesktop.length; i++) {
            articleDesktop[i].classList.remove('article-onscrolldown')
        }
    }

    await wait(1200)
    for (let i = 0; i < icons.length; i++) {
        icons[i].style.visibility = "visible"
        icons[i].classList.add('fade-in')
    }

    if (navi.classList.contains('navi-desktop')) {
        renderDesktopNavAndFoot()
    } else navi.style.height = '2.5rem'

    for (let k = 0; k < footerIcons.length; k++) {
        footerIcons[k].style.visibility = 'visible'
        footerIcons[k].classList.add('fade-in')
    }
    for (let j = 0; j < footerMenuItems.length; j++) {
        footerMenuItems[j].style.visibility = 'visible'
        footerMenuItems[j].classList.add('fade-in')
    }
}

/* icon scale up */
function scaleUp(e) {
    const selectedIcon = document.getElementById(e.id)
    icons.forEach((icon) => {
        if (icon.classList.contains('scaled')) icon.classList.remove('scaled')
        else selectedIcon.classList.toggle('scaled')
        selectedIcon.classList.add('scaled')
        }
    )
}

function expand() {
    navi.classList.add('expanded')
    setTimeout(() => {
        navi.classList.add('navbar')
        navi.classList.remove('expanded', 'prompt')
        navi.removeEventListener('click', expand, false)

        icons.forEach((icon) => {
            icon.style.visibility = 'visible'
            icon.classList.add('fade-in')
        })

        for (let k = 0; k < footerIcons.length; k++) {
            footerIcons[k].style.visibility = 'visible'
            footerIcons[k].classList.add('fade-in')
        }
        for (let j = 0; j < footerMenuItems.length; j++) {
            footerMenuItems[j].style.visibility = 'visible'
            footerMenuItems[j].classList.add('fade-in')
        }

    }, 1250)
}
