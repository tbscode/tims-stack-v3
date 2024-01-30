export { onPageTransitionEnd }

async function onPageTransitionEnd(pageContext) {
    console.log('Page transition end')
    console.log('Is backwards navigation?', pageContext.isBackwardNavigation)
    document.body.classList.remove('page-is-transitioning')
}