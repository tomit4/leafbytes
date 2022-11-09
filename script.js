"use strict"

window.addEventListener('load', () => {
    loadPage()
    loadTitle()
    removeTitle()
    determineIfPrefersDarkMode()
    determineIfAtDesktopDimensions()
    renderDesktopNavAndFoot(true)
    addArticleDivDesktop(true)
})

window.addEventListener('resize', () => {
    determineIfAtDesktopDimensions()
    if (isAtDesktopDimensions)
        initialPageLoad = true
    renderDesktopNavAndFoot(false)
    addArticleDivDesktop(false)
})

/* grab head elements for adjust dark/light css themes */
const head = document.getElementsByTagName('HEAD')

/* selector for the entire html body */
const body = document.querySelector('body')

/* all divs */
const divElements = document.getElementsByTagName('div')

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
const leafbytesBody = document.getElementsByClassName('leafbytes-body')
const articleLinks= document.getElementsByClassName('article-links')
const linkItems = document.getElementsByClassName('link-item')

/* article inner elements */
const introHeader = document.querySelectorAll('.intro-header')
const articleHeader = document.querySelectorAll('.article-header')
const articleHeader3 = document.querySelectorAll('.article-header3')
const articleBody= document.querySelectorAll('.article-body')
const articleDesktop = document.getElementsByClassName('article-desktop')

/* footer elements */
const foot = document.querySelector('.foot')
const footerIcons = document.querySelectorAll('.footer-icons')
const footerMenuItems = document.getElementsByClassName('footer-menu-item')

/* all script tags */
const scripts = document.getElementsByTagName('script')

/* flag that checks if at desktop dimensions */
let isAtDesktopDimensions = false

/* flag that checks if user has already scrolled up once */
let alreadyScrolledUp = false

/* flag that checks if initalPageLoad is complete
* (i.e. loadArticles has loaded once)*/
let initialPageLoad = true

/* cache article so it doesn't
* re-render fetched html upon page resize */
let cachedArticle = undefined
let homePageCache = undefined

/* for use with toggleDark() toggleLight() */
let hasDarkCSS = false

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

function determineIfPrefersDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleDark()
    }
}

/* on hover of closed navbar or footer, they expand and become visible */
navi.addEventListener('mouseover', () => {
    if (!alreadyScrolledUp) activateScrollUp()
})

navi.addEventListener('click', () => {
    if (!alreadyScrolledUp) {
        activateScrollUp()
        navi.style.height="2.5rem"
    }
})

foot.addEventListener('mouseover', () => {
    if (!alreadyScrolledUp) activateScrollUp()
})

foot.addEventListener('click', () => {
    if (!alreadyScrolledUp) {
        activateScrollUp()
        navi.style.height="2.5rem"
    }
})

/* simple bool @media check for 1920px x 980px */
function determineIfAtDesktopDimensions() {
    isAtDesktopDimensions = (window.matchMedia('(min-width: 1920px)').matches &&
        window.matchMedia('(min-height: 980px)').matches) ? true : false
}

/* main function called onload and onresize that renders navbar/footer */
async function renderDesktopNavAndFoot(onInitialLoad) {
    let delay = (onInitialLoad) ? 3000 : 0

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
        if (!navi.classList.contains('navi-desktop'))
            navi.classList.add('navi-desktop')
        desktopMenuItems.innerHTML = ''
        desktopFooterItems.innerHTML = ''
    } else {
        if (navi.classList.contains('navi-desktop'))
            navi.classList.remove('navi-desktop')
        desktopMenuItems.innerHTML = ''
        desktopFooterItems.innerHTML = ''
    }
}

function resizeNavBar() {
    if (isAtDesktopDimensions) {
        navi.style.height = '4rem'
        if (navi.classList.contains('navbar-onscrollup'))
            navBarOnScrollUp.forEach((navBarItem) =>
                navBarItem.style.height = '4rem')
    } else {
        navi.style.height = '2.5rem'
        if (navi.classList.contains('navbar-onscrollup'))
            navBarOnScrollUp.forEach((navBarItem) =>
                navBarItem.style.height = '2.5rem')
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
                if (icon.id === key &&
                    !icon.classList.contains('scaled')) {
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
    navBarMenuItem.forEach((menuItem) =>
        menuItem.classList.add('fade-in'))

    for (let i = 0; i < footerMenuItems.length; i++) {
        footerMenuItems[i].style.visibility = "visible"
        footerMenuItems[i].classList.add('fade-in')
    }
}

async function fetchWelcomePage() {
    await fetch('./welcome.html')
        .then((res) => { return res.text() })
        .then((html) => {
            for (let i = 0; i < articleDesktop.length; i++)
                articleDesktop[i].innerHTML = html
        })
}

async function fetchHomePage() {
    await fetch('./home.html')
        .then((res) => { return res.text() })
        .then(async (html) => {
            homePageCache = html
            article.innerHTML = html
        })
    showTreeOnInitialPageLoad()
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
    // showTreeOnInitialPageLoad()
    homeIcon.classList.add('scaled')
    icons.forEach((icon) =>
        icon.classList.remove('fade-in'))
}

async function loadArticles(e) {
    if (initialPageLoad)
        await addArticleDiv()
    initialPageLoad = false
    scaleUp(e)
    await fetch(`./${e.id}.html`)
        .then((res) => { return res.text() })
        .then((async (html) => {
            if (isAtDesktopDimensions) {
                if (`${e.id}` === 'home') {
                    fetchWelcomePage()
                    cachedArticle = undefined
                } else {
                    cachedArticle = html
                    for (let i = 0; i < articleDesktop.length; i++)
                        articleDesktop[i].innerHTML = html
                }
                if (article.innerHTML === '')
                    fetchHomePage()
            }
            else {
                article.innerHTML = html
                if (`${e.id}` !== 'home') {
                    scaleUp(e)
                    cachedArticle = html
                } else {
                    showTreeOnInitialPageLoad()
                }
                for (let i = 0; i < articleDesktop.length; i++)
                    body.removeChild(articleDesktop[i])
            }
            window.Prism.highlightAll()
        }))
    // window.history.pushState({}, '', `${window.location.origin}/${e.id}`)
}

async function addArticleDivDesktop(onInitialLoad) {
    if (onInitialLoad) await wait(7000)
    if (isAtDesktopDimensions) {
        for (let i = 0; i < divElements.length; i++)
            if (divElements[i].classList.contains('article-desktop')) return
        const node = document.createElement('div')
        node.classList.add('article-desktop')
        body.insertBefore(node, foot)
        if (cachedArticle === undefined)
            fetchWelcomePage()
        else
            if (cachedArticle !== homePageCache)
                for (let i = 0; i < articleDesktop.length; i++)
                    articleDesktop[i].innerHTML = cachedArticle
            else
                fetchWelcomePage()
        article.innerHTML = ''
        fetchHomePage()
        window.Prism.highlightAll()
    } else {
        for (let i = 0; i < articleDesktop.length; i++)
            body.removeChild(articleDesktop[i])
        if (cachedArticle !== undefined)
            article.innerHTML = cachedArticle
        window.Prism.highlightAll()
    }
    activateScrollBehavior(articleDesktop)
}

function addArticleDiv() {
    if (document.body.contains(article))
        document.body.removeChild(article)
    article = document.createElement('div')
    article.classList.add('article')
    body.insertBefore(article, foot)
    activateScrollBehavior(article)
}

async function renderIt(articleId) {
    await fetch(`./articles/tech/${articleId}.html`)
        .then((res) => { return res.text() })
        .then((async (html) => {
            if (isAtDesktopDimensions) {
                cachedArticle = html
                for (let i = 0; i < articleDesktop.length; i++)
                    articleDesktop[i].innerHTML = html
            }
            else {
                await wait(1000)
                cachedArticle = html
                article.innerHTML = html
                for (let i = 0; i < articleDesktop.length; i++)
                    body.removeChild(articleDesktop[i])
            }
            window.Prism.highlightAll()
        }))
    return cachedArticle
    // window.history.pushState({}, '', `${window.location.origin}/articles/tech/${articlesId}`)
}

function renderArticle(articleId) {
    if (!isAtDesktopDimensions) {
        for (let i = 0; i < leafbytesBody.length; i++)
            leafbytesBody[i].classList.add('leafbytes-fadeout-content')
        for (let i = 0; i < articleLinks.length; i++)
            articleLinks[i].classList.add('leafbytes-fadeout-content')
        for (let i = 0; i < linkItems.length; i++)
            linkItems[i].classList.add('leafbytes-fadeout-content')
    }
    renderIt(articleId)
}

async function renderNext(articleId) {
    introHeader.forEach((header) =>
        header.classList.add('leafbytes-fadeout-content2'))
    articleBody.forEach((bodyElem) =>
        bodyElem.classList.add('leafbytes-fadeout-content2'))
    if (!isAtDesktopDimensions) {
        articleHeader.forEach((header) =>
            header.classList.add('leafbytes-fadeout-content2'))
        articleHeader3.forEach((header3) =>
            header3.classList.add('leafbytes-fadeout-content2'))
    }
    articleId = `tech-subject-${articleId + 1}`
    renderIt(articleId)
}

async function renderPrev(articleId) {
    for (let i = 0; i < introHeader.length; i++)
        introHeader[i].classList.add('leafbytes-fadeout-content2')
    articleBody.forEach((bodyElem) =>
        bodyElem.classList.add('leafbytes-fadeout-content2'))
    if (!isAtDesktopDimensions) {
        articleHeader.forEach((header) =>
            header.classList.add('leafbytes-fadeout-content2'))
        articleHeader3.forEach((header3) =>
            header3.classList.add('leafbytes-fadeout-content2'))
    }
    articleId = `tech-subject-${articleId - 1}`
    renderIt(articleId)
}

function activateScrollBehavior(articleDiv) {
    let scrollPosition = 0
    if (articleDiv === article) {
        article.addEventListener('scroll', () => {
            let sTop = article.scrollTop
            if (sTop > scrollPosition)
                activateScrollDown()
             else
                activateScrollUp()
            scrollPosition = sTop <= 0 ? 0 : sTop
        }, false)
    } else if (articleDiv === articleDesktop) {
        for (let i = 0; i < articleDesktop.length; i++) {
            articleDesktop[i].addEventListener('scroll', () => {
                let sTop = articleDesktop[i].scrollTop
                if (sTop > scrollPosition)
                    activateScrollDown()
                 else
                    activateScrollUp()
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
    footerIcons.forEach((footerIcon) => {
        footerIcon.style.visibility = 'hidden'
        footerIcon.classList.remove('fade-in')
    })
    for (let j = 0; j < footerMenuItems.length; j++) {
        footerMenuItems[j].style.visibility = 'hidden'
        footerMenuItems[j].classList.remove('fade-in')
    }

    // add onscrollup classes here
    navi.classList.add('navbar-onscrolldown')
    foot.classList.add('foot-onscrolldown')
    article.classList.add('article-onscrolldown')
    if (isAtDesktopDimensions)
        for (let i = 0; i < articleDesktop.length; i++)
            articleDesktop[i].classList.add('article-onscrolldown')

    // remove onscrollup classes here
    desktopMenuItems.innerHTML = ''
    navi.style.height = '0'
    navi.classList.remove('navbar-onscrollup')
    foot.classList.remove('foot-onscrollup')
    article.classList.remove('article-onscrollup')
    if (isAtDesktopDimensions)
        for (let i = 0; i < articleDesktop.length; i++)
            articleDesktop[i].classList.remove('article-onscrollup')

    alreadyScrolledUp = false
}

async function activateScrollUp() {
    // onscrollup animations
    navi.classList.add('navbar-onscrollup')
    foot.classList.add('foot-onscrollup')
    article.classList.add('article-onscrollup')
    if (isAtDesktopDimensions)
        for (let i = 0; i < articleDesktop.length; i++)
            articleDesktop[i].classList.add('article-onscrollup')

    navi.classList.remove('navbar-onscrolldown')
    foot.classList.remove('foot-onscrolldown')
    article.classList.remove('article-onscrolldown')
    if (isAtDesktopDimensions)
        for (let i = 0; i < articleDesktop.length; i++)
            articleDesktop[i].classList.remove('article-onscrolldown')

    await wait(1200)
    icons.forEach((icon) => {
        icon.style.visibility = "visible"
        icon.classList.add('fade-in')
    })

    if (navi.classList.contains('navi-desktop')&& !alreadyScrolledUp)
        renderDesktopNavAndFoot()

    footerIcons.forEach((footerIcon) => {
        footerIcon.style.visibility = 'visible'
        footerIcon.classList.add('fade-in')
    })

    for (let j = 0; j < footerMenuItems.length; j++) {
        footerMenuItems[j].style.visibility = 'visible'
        footerMenuItems[j].classList.add('fade-in')
    }
    alreadyScrolledUp = true
}

/* icon scale up */
function scaleUp(e) {
    const selectedIcon = document.getElementById(e.id)
    icons.forEach((icon) => {
        if (icon.classList.contains('scaled'))
            icon.classList.remove('scaled')
        else
            selectedIcon.classList.toggle('scaled')
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

        footerIcons.forEach((footerIcon) => {
            footerIcon.style.visibility = 'visible'
            footerIcon.classList.add('fade-in')
        })

        for (let j = 0; j < footerMenuItems.length; j++) {
            footerMenuItems[j].style.visibility = 'visible'
            footerMenuItems[j].classList.add('fade-in')
        }

    }, 1250)
}

function toggleLight() {
    if (!hasDarkCSS) return

    head[0].removeChild(head[0].lastChild)
    head[0].removeChild(head[0].lastChild)
    body.removeChild(scripts[0])

    const newScript = document.createElement('script')
    newScript.src = './prism_js/prism_solarized.js'
    console.log(newScript)
    body.insertBefore(newScript, scripts[0])

    const prismLink = document.createElement('link')
    prismLink.rel = 'stylesheet'
    prismLink.type = 'text/css'
    prismLink.href = 'styles/prism_solarized.css'
    head[0].appendChild(prismLink)

    hasDarkCSS = !hasDarkCSS
}

function toggleDark() {
    if (hasDarkCSS) return

    head[0].removeChild(head[0].lastChild)
    body.removeChild(scripts[0])

    const newScript = document.createElement('script')
    newScript.src = './prism_js/prism_okaidia.js'
    console.log(newScript)
    body.insertBefore(newScript, scripts[0])

    const prismLink = document.createElement('link')
    prismLink.rel = 'stylesheet'
    prismLink.type = 'text/css'
    prismLink.href = 'styles/prism_okaidia.css'
    head[0].appendChild(prismLink)

    const darkLink = document.createElement('link')
    darkLink.rel = 'stylesheet'
    darkLink.type = 'text/css'
    darkLink.href = 'styles/darkreader.css'
    head[0].appendChild(darkLink)

    hasDarkCSS = !hasDarkCSS
}
