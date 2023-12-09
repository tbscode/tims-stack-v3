import { render, redirect } from 'vike/abort'

export { onBeforeRender }
async function onBeforeRender(pageContext) {
    /*
     If xcsrfToken or cookie is not set, we might be rendering SSG mode
      if(!(pageContext.xcsrfToken && pageContext.requestHeaders.cookie))
          return {pageContext: {shell: 'dashboard', pageProps: {}}}
        */
    
    if(!pageContext.sessionId){
        // no sessionId means unauthenticated!
        throw render('/login/') 
    }
    // Still the sessionId could be expired, test by fetching user_data
    const res = await fetch("http://host.docker.internal:8000/api/user_data", {
        headers: {
          cookie: pageContext.requestHeaders.cookie,
          'X-CSRFToken': pageContext.xcsrfToken,
        },
        method: 'GET',
        credentials: 'include'
    })

    if(res.status === 403){
        throw redirect('/login/')
    }

    const data = await res.json()
    
    return {pageContext: {shell: 'dashboard', INJECT_REDUX_STATE: {
        chats: data.chats,
        user: data.user
    }}}
}
