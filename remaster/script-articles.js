/* article-specific js */

function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

let treeToggled = false
async function showTree(className) {
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
