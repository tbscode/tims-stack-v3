export { render }

import ReactDOM from 'react-dom/client'
import { PageShell } from './PageShell'
import { getStore } from './store/store'
import { Provider } from 'react-redux'
import "./index.css"

export const hydrationCanBeAborted = true
export const clientRouting = true

// This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vike.dev/clientRouting */

let root
const render = async (pageContext) => {
  const { Page, pageProps } = pageContext

  const store = getStore(pageContext.PRELOADED_STATE)
  const page = (
    <PageShell pageContext={pageContext} shell={pageContext.shell || "default"}>
        <Provider store={store}>
          <Page {...pageProps} />
        </Provider>
    </PageShell>
  )
  const container = document.getElementById('react-root')
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page)
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container)
    }
    root.render(page)
  }
  //document.title = getPageTitle(pageContext)
}

function onHydrationEnd() {
  console.log('Hydration finished; page is now interactive.')
}
function onPageTransitionStart() {
  console.log('Page transition start')
  document.querySelector('body').classList.add('page-is-transitioning')
}
function onPageTransitionEnd() {
  console.log('Page transition end')
  document.querySelector('body').classList.remove('page-is-transitioning')
}