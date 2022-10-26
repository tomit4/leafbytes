"use strict"

window.onload = loadPage()
window.onload = loadTitle()
window.onload = removeTitle()

/* selector for the entire html body */
const body = document.querySelector('body')

/* all divs */
const divElements = document.getElementsByTagName('div')

/* selectors of HTML elements by tag name */
const li = document.getElementsByTagName('li')

/* navbar elements */
const navi = document.querySelector('.navi')
const navBar = document.querySelector('.navbar')
const navBarMenuItem = document.getElementsByClassName('navbar-menu-item')
const navBarOnScrollUp = document.getElementsByClassName('navbar-onscrollup')
const prompt = document.querySelector('.prompt')
const icons = document.getElementsByClassName('icons')

/* individual icon elements */
const homeIcon = document.getElementById('home')

/* circuit animation elements */
const circuitOuter = document.querySelector('.circuit-outer')
const circuitInner = document.querySelector('.circuit-inner')
const current = document.querySelector('.current')

/* title elements */
const leafbytes = document.querySelector('.leafbytes')
const subtitle = document.querySelector('.subtitle')

/* grab ul elements for generating html desktop navbar */
const desktopMenuItems = document.querySelector('.desktop-menu-items')

/* article elements */
let article = document.querySelector('.article')
const leafbytesBody = document.getElementsByClassName('leafbytes-body')
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

/* flag that checks if at desktop dimensions */
let isAtDesktopDimensions = false

/* extremely useful wait() function */
function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

window.addEventListener('load', () => {
    determineIfAtDesktopDimensions()
    renderDesktopNav(true)
    addArticleDivDesktop(true)
})

window.addEventListener('resize', () => {
    determineIfAtDesktopDimensions()
    if (isAtDesktopDimensions) {
        loadArticles(home)
    }
    renderDesktopNav(false)
    addArticleDivDesktop(false)
})

function determineIfAtDesktopDimensions() {
    if (window.matchMedia('(min-width: 1920px)').matches &&
        window.matchMedia('(min-height: 980px)').matches)
        isAtDesktopDimensions = true
    else isAtDesktopDimensions = false
}

async function renderDesktopNav(onInitialLoad) {
    let delay
    if (onInitialLoad) delay = 3000
    else delay = 0


    if (isAtDesktopDimensions) {
        if (!navi.classList.contains('navi-desktop')) {
            navi.classList.add('navi-desktop')
        }
        desktopMenuItems.innerHTML = ''

        for (let i = 0; i < icons.length; i++) {
            icons[i].style.margin = '0.25rem 1.75rem 0.25rem 1.85rem'
        }

        navi.style.height = '4rem'
        if (navi.classList.contains('navbar-onscrollup')) {
             for (let i = 0; i < navBarOnScrollUp.length; i++) {
                navBarOnScrollUp[i].style.height = '4rem'
            }
        }

        const navList = {
            'contact': contact,
            'about': about,
            'home': home,
            'comments': comments,
            'links': link
        }

        for (let key in navList) {
            const node = document.createElement('li')
            node.classList.add('navbar-menu-item')
            node.id = `menu-${key}`
            node.innerHTML = `${key[0].toUpperCase()}${key.substring(1,key.length)}`
            node.addEventListener('click', (e) => {
                e.preventDefault()
                for (let i = 0; i < icons.length; i++) {
                    if (icons[i].id === key && !icons[i].classList.contains('scaled')) {
                        icons[i].classList.add('scaled')
                    }
                }
                loadArticles(navList[key])
            })
            desktopMenuItems.appendChild(node)
        }
        await wait(delay)
        for (let i = 0; i < navBarMenuItem.length; i++) {
            navBarMenuItem[i].classList.add('fade-in')
        }
    } else {
        if (navi.classList.contains('navi-desktop')) {
            navi.classList.remove('navi-desktop')
        }
        for (let i = 0; i < icons.length; i++) {
            icons[i].style.margin = '0.25rem 1rem 0.25rem 0.25rem'
        }

        navi.style.height = '2.5rem'

        if (navi.classList.contains('navbar-onscrollup')) {
            for (let i = 0; i < navBarOnScrollUp.length; i++) {
                navBarOnScrollUp[i].style.height = '2.5rem'
            }
        }

        desktopMenuItems.innerHTML = ''
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
    loadArticles(home)
    homeIcon.classList.add('scaled')
    for (let i = 0; i < icons.length; i++) {
        icons[i].classList.remove('fade-in')
    }
}

async function loadArticles(e) {
    await addArticleDiv()
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
                await fetch('./home.html')
                    .then((res) => {
                        return res.text()
                    })
                    .then((html) => {
                        article.innerHTML = html
                    })
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
    }

    if (!isAtDesktopDimensions) {
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
    await wait(1000)
    article.textContent = ""
    await fetch(`./articles/tech/${articleId}.html`)
        .then((res) => {
            return res.text()
        })
        .then((async (html) => {
            if (isAtDesktopDimensions) {
                await fetch('./home.html')
                    .then((res) => {
                        return res.text()
                    })
                    .then((html) => {
                        article.innerHTML = html
                    })
                for (let i = 0; i < articleDesktop.length; i++) {
                    articleDesktop[i].innerHTML = html
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
    // window.history.pushState({}, '', `${window.location.origin}/articles/tech/${articlesId}`)
}

function renderArticle(articleId) {
    for (let i = 0; i< leafbytesBody.length; i++) {
        leafbytesBody[i].classList.add('leafbytes-fadeout-content')
    }
    for (let i = 0; i< articleLinks.length; i++) {
        articleLinks[i].classList.add('leafbytes-fadeout-content')
    }
    for (let i = 0; i< linkItem.length; i++) {
        linkItem[i].classList.add('leafbytes-fadeout-content')
    }
    renderIt(articleId)
}

async function renderNext(articleId) {
    for (let i = 0; i < introHeader.length; i++) {
        introHeader[i].classList.add('leafbytes-fadeout-content2')
    }
    for (let i = 0; i < articleHeader.length; i++) {
        articleHeader[i].classList.add('leafbytes-fadeout-content2')
    }
    for (let i = 0; i < articleHeader3.length; i++) {
        articleHeader3[i].classList.add('leafbytes-fadeout-content2')
    }
    for (let i = 0; i < articleBody.length; i++) {
        articleBody[i].classList.add('leafbytes-fadeout-content2')
    }

    articleId = articleId + 1;
    articleId = `tech-subject-${articleId}`
    renderIt(articleId)
}

async function renderPrev(articleId) {
    for (let i = 0; i < introHeader.length; i++) {
        introHeader[i].classList.add('leafbytes-fadeout-content2')
    }
    for (let i = 0; i < articleHeader.length; i++) {
        articleHeader[i].classList.add('leafbytes-fadeout-content2')
    }
    for (let i = 0; i < articleHeader3.length; i++) {
        articleHeader3[i].classList.add('leafbytes-fadeout-content2')
    }
    for (let i = 0; i < articleBody.length; i++) {
        articleBody[i].classList.add('leafbytes-fadeout-content2')
    }

    articleId = articleId - 1;
    articleId = `tech-subject-${articleId}`
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
    for (let i = 0; i < icons.length; i++) {
        icons[i].style.visibility = "hidden"
        icons[i].classList.remove('fade-in')
    }
    for (let k = 0; k < footerIcons.length; k++) {
        footerIcons[k].style.visibility = "hidden"
        footerIcons[k].classList.remove('fade-in')
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
        renderDesktopNav()
    } else navi.style.height = '2.5rem'

    for (let k = 0; k < footerIcons.length; k++) {
        footerIcons[k].style.visibility = "visible"
        footerIcons[k].classList.add('fade-in')
    }
}

/* icon scale up */
function scaleUp(e) {
    const selectedIcon = document.getElementById(e.id)
    for (let i = 0; i < icons.length; i++) {
        if (icons[i].classList.contains('scaled')) {
            icons[i].classList.remove('scaled')
        } else
            selectedIcon.classList.toggle('scaled')
            selectedIcon.classList.add('scaled')
    }
}

function expand() {
    navi.classList.add('expanded')
    setTimeout(() => {
        navi.classList.add('navbar')
        navi.classList.remove('expanded', 'prompt')
        navi.removeEventListener('click', expand, false)

        for (let i = 0; i < icons.length; i++) {
            icons[i].style.visibility = 'visible'
            icons[i].classList.add('fade-in')
        }

        for (let k = 0; k < footerIcons.length; k++) {
            footerIcons[k].style.visibility = 'visible'
            footerIcons[k].classList.add('fade-in')
        }

    }, 1250)
}
