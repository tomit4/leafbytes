## A Refactoring of LeafBytes Website

__Checklist__

- [x] Remove circuit-* and current classes and replace with standard, similar looking div (same color, shape, position,, etc)
- [x] Read [this article on how to create a scrollable div](https://www.positioniseverything.net/html-scrollable-div)
- [x] Add a window.onload event that fades in the hamburger menu, then opens it, animates the title/logo fading in, and then selects the HOME navigation option, which will bring up the welcome page
- [x] Style some dummy text that will animate a header portion next to the hamburger menu, and then render the main text of the article
- [ ] Add a noscript tag and render your page as not a SPA for reasons of accessibility, privacy, and SEO friendliness
- [ ] Watch/read [this tutorial](https://dev.to/thedevdrawer/single-page-application-routing-using-hash-or-url-9jh) on buidling a SPA without a framework
- [ ] Figure out how to best handle <meta> tag shenanigans
- [ ] For the sqlite database, you sqlcipher instead and require a PRAGMA-KEY via dotenv. Or look into encrypting the .db file
