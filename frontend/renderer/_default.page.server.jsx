export { render }
// See https://vike.dev/data-fetching
export const passToClient = ['pageProps', 'urlPathname', 'PRELOADED_STATE']

import ReactDOMServer from 'react-dom/server'

import { PageShell } from './PageShell'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import logoUrl from './logo.svg'
import { getStore } from './store/store'
import { Provider } from 'react-redux'

async function render(pageContext) {
  const { Page, pageProps } = pageContext
  // const store = getStore()
  const store = getStore()

  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Provider store={store}>
        <Page {...pageProps} />
      </Provider>
    </PageShell>
  )

  // See https://vike.dev/head
  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc = (documentProps && documentProps.description) || 'App using Vite + Vike'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  const PRELOADED_STATE = store.getState()
  return {
    documentHtml,
    pageContext: {
      PRELOADED_STATE
    }
  }
}
