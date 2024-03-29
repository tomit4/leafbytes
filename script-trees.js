"use strict"
/* article-specific js */



function scaleLinkItems(className) {
    const directories = document.getElementsByClassName('directories')
    for (let i = 0; i < linkItems.length; i++) {
        if (linkItems[i].classList.contains(className))
            directories[i].classList.toggle('linkItemToggled')

        linkItems[i].style.transform =
            (directories[i].classList.contains('linkItemToggled'))
            ? "scale(1.03)"
            : "scale(1.0)"
    }
}

/* needs to be refactored */
async function showTree(className, waitTime = 1000) {
    scaleLinkItems(className)

    const treeName = document.getElementsByClassName(`${className}-tree`)
    const vertTreeName = document.getElementsByClassName(`${className}-tree-vert`)
    const horizTreeName = document.getElementsByClassName(`${className}-tree-horiz`)
    const subjectTreeName = document.getElementsByClassName(`${className}-tree-subject`)

    for (let i = 0; i < treeName.length; i++) {
        if (treeName[i].closest('.linkItemToggled')) {
            treeName[i].classList.remove(`${className}-tree-hidden`)
            treeName[i].classList.add(`${className}-tree-show`)

            for (let i = 0; i < vertTreeName.length; i++) {
                vertTreeName[i].classList.remove(`${className}-tree-vert-hidden`)
                vertTreeName[i].classList.add(`${className}-tree-vert-show`)
            }

            await wait(waitTime)
            for (let i = 0; i < horizTreeName.length; i++) {
                horizTreeName[i].classList.remove(`${className}-tree-horiz-hidden`)
                horizTreeName[i].classList.add(`${className}-tree-horiz-show`)
            }
            for (let i = 0; i < subjectTreeName.length; i++) {
                subjectTreeName[i].classList.remove(`${className}-tree-subject-hidden`)
                subjectTreeName[i].classList.add(`${className}-tree-subject-show`)
            }

        /* add classNames that initiate retracting animation here */
        } else {
            for (let i = 0; i < subjectTreeName.length; i++) {
                subjectTreeName[i].classList.remove(`${className}-tree-subject-show`)
                subjectTreeName[i].classList.add(`${className}-tree-subject-hidden`)
            }

            for (let i = 0; i < horizTreeName.length; i++) {
                horizTreeName[i].classList.remove(`${className}-tree-horiz-show`)
                horizTreeName[i].classList.add(`${className}-tree-horiz-hidden`)
            }

            await wait(waitTime)
            for (let i = 0; i < vertTreeName.length; i++) {
                vertTreeName[i].classList.remove(`${className}-tree-vert-show`)
                vertTreeName[i].classList.add(`${className}-tree-vert-hidden`)
            }
            await wait(waitTime)
            for (let i = 0; i < treeName.length; i++) {
                treeName[i].classList.remove(`${className}-tree-show`)
                treeName[i].classList.add(`${className}-tree-hidden`)
            }

        }
    }
}

const treeSubjects = ['portfolio', 'tech', 'dev', 'use', 'art']
async function showTreeOnInitialPageLoad(waitTime = 0) {
    await wait(waitTime)
    for (let i = 0; i < treeSubjects.length; i++) {
        showTree(treeSubjects[i])
    }
}
