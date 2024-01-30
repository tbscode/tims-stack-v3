export default render
import React from 'react'
import ReactDOM from 'react-dom/client'
import { PageShell } from './PageShell'
import { getStore } from './store/store'
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import WebsocketBridge from '../atoms/websocket-bridge'
import { number } from "prop-types";
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

  const page = (
    <PageShell pageContext={pageContext}>
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

export function onHydrationEnd(pageContext) {
  console.log('Hydration finished; page is now interactive.', window.innerWidth, pageContext)
}