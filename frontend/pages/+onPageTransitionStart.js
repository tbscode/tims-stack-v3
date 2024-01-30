export { onPageTransitionStart }

async function onPageTransitionStart(pageContext) {
  console.log('Page transition start')
  console.log('Is backwards navigation?', pageContext.isBackwardNavigation)
  document.body.classList.add('page-is-transitioning')
}