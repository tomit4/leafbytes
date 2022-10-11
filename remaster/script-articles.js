/* article-specific js */

function isLinkItem(className) {
    const name = document.querySelector(`${className}`)
    name.addEventListener('click', () => {
        console.log(`${className} was clicked`)
    })
}
