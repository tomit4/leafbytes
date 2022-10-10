## A Refactoring of LeafBytes Website

__Checklist__

- [x] Remove circuit-* and current classes and replace with standard, similar looking div (same color, shape, position,, etc)
- [x] Read [this article on how to create a scrollable div](https://www.positioniseverything.net/html-scrollable-div)
- [x] Add a window.onload event that fades in the hamburger menu, then opens it, animates the title/logo fading in, and then selects the HOME navigation option, which will bring up the welcome page
- [x] Style some dummy text that will animate a header portion next to the hamburger menu, and then render the main text of the article
- [ ] Consider fade in effects for when you scroll. Think about whether or not to hide the footer during reading (increase screen space, but will require some CSS work on the footer itself)
- [ ] Add a <noscript> tag and render your page as not a SPA for reasons of accessibility, privacy, and SEO friendliness
- [ ] Figure out how to best handle <meta> tag shenanigans
