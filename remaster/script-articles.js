/* article-specific js */
let treeToggled = false
let linkItemToggled = false

function scaleLinkItems(className) {
    const linkItems = document.getElementsByClassName('link-item')
    if (linkItemToggled === false) {
        for (let i = 0; i < linkItems.length; i++) {
            if (linkItems[i].classList.contains(className)) {
                linkItems[i].style.transform = "scale(1.03)"
                linkItemToggled = !linkItemToggled
                console.log(`linkItems[i] selected is: ${linkItems[i]}`)
                console.log(`className is ${className}`)
                console.log(`linkItemToggled is ${linkItemToggled}`)
            }
        }
    } else {
        for (let i = 0; i < linkItems.length; i++) {
            if (linkItems[i].classList.contains(className)) {
                linkItems[i].style.transform = "scale(0.97)"
                linkItemToggled = !linkItemToggled
            }
        }
    }
}

function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

async function showTree(className) {
    scaleLinkItems(className)
    const treeName = document.getElementsByClassName(`${className}-tree`)
    const vertTreeName = document.getElementsByClassName(`${className}-tree-vert`)
    const horizTreeName = document.getElementsByClassName(`${className}-tree-horiz`)
    const subjectTreeName = document.getElementsByClassName(`${className}-tree-subject`)

    if (treeToggled === false) {
        for (let i = 0; i < treeName.length; i++) {
            treeName[i].classList.remove(`${className}-tree-hidden`)
            treeName[i].classList.add(`${className}-tree-show`)
        }
        for (let i = 0; i < vertTreeName.length; i++) {
            vertTreeName[i].classList.add(`${className}-tree-vert-show`)
        }

        await wait(1000)
        for (let i = 0; i < horizTreeName.length; i++) {
            horizTreeName[i].classList.add(`${className}-tree-horiz-show`)
        }
        for (let i = 0; i < subjectTreeName.length; i++) {
            subjectTreeName[i].classList.add(`${className}-tree-subject-show`)
        }

    } else {
        for (let i = 0; i < treeName.length; i++) {
            treeName[i].classList.add(`${className}-tree-hidden`)
            treeName[i].classList.remove(`${className}-tree-show`)
        }
        for (let i = 0; i < vertTreeName.length; i++) {
            vertTreeName[i].classList.remove(`${className}-tree-vert-show`)
        }
        for (let i = 0; i < horizTreeName.length; i++) {
            horizTreeName[i].classList.remove(`${className}-tree-horiz-show`)
        }
        for (let i = 0; i < subjectTreeName.length; i++) {
            subjectTreeName[i].classList.remove(`${className}-tree-subject-show`)
        }
    }
    treeToggled = !treeToggled
}
