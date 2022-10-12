/* article-specific js */
let treeToggled = false
function showTree(className) {
    const treeName = document.getElementsByClassName(`${className}-tree`)
    const vertTreeName = document.getElementsByClassName(`${className}-tree-vert`)


    if (treeToggled === false) {
        for (let i = 0; i < treeName.length; i++) {
            treeName[i].classList.remove(`${className}-tree-hidden`)
            treeName[i].classList.add(`${className}-tree-show`)
        }
        for (let i = 0; i < vertTreeName.length; i++) {
            vertTreeName[i].classList.add(`${className}-tree-vert-show`)
        }
    } else {
        for (let i = 0; i < treeName.length; i++) {
            treeName[i].classList.add(`${className}-tree-hidden`)
            treeName[i].classList.remove(`${className}-tree-show`)
        }
        for (let i = 0; i < vertTreeName.length; i++) {
            vertTreeName[i].classList.remove(`${className}-tree-vert-show`)
        }
    }
    treeToggled = !treeToggled
}
