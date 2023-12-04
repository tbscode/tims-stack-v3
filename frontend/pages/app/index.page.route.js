import { render, redirect } from 'vike/abort'

export const guard = (pageContext) => {
    if(!pageContext.sessionId){
        throw render('/login/') 
    }
}