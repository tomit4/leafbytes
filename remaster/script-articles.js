/* article-specific js */
let treeToggled = false
function showTree(className) {
    const cName = document.getElementsByClassName(`${className}-tree`)
    if (treeToggled === false) {
        for (let i = 0; i < cName.length; i++) {
            cName[i].classList.remove(`${className}-tree-hidden`)
            cName[i].classList.add(`${className}-tree-show`)
        }
    } else {
        for (let i = 0; i < cName.length; i++) {
            cName[i].classList.add(`${className}-tree-hidden`)
            cName[i].classList.remove(`${className}-tree-show`)
        }
    }
    treeToggled = !treeToggled
}
