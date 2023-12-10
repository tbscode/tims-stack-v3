export default render

import ReactDOM from 'react-dom/client'
import { PageShell } from './PageShell'
import { getStore } from './store/store'
import { Provider } from 'react-redux'
import WebsocketBridge from '../atoms/websocket-bridge'
import "./index.css"

let root
let globalStore = null
async function render(pageContext) {
  const { Page, pageProps } = pageContext
 
  
  let store = globalStore
  if(!store){
    if(pageContext.PRELOADED_STATE)
      store = getStore(pageContext.PRELOADED_STATE)
    else
      store = getStore()
    globalStore = store
  }
  let state = store.getState()

  console.log("CLIENT RENDER", pageContext.PRELOADED_STATE, store, globalStore)

  const page = (
    <PageShell pageContext={pageContext} shell={pageContext.shell || "default"}>
        <Provider store={store}>
          <WebsocketBridge />
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