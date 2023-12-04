import React, { useState } from 'react'
import { navigate } from 'vike/client/router'

export { Page }
export { onBeforeRender }

async function onBeforeRender(pageContext) {
  return {
    pageContext: {
      shell: "default",
      pageProps: {
        xcsrfToken: pageContext.xcsrfToken
      }
    }
  }
}

function Page(pageProps) {
  
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    loading: false
  })
  
  const performLogin = () => {
    setLoginData({
      ...loginData,
      loading: true
    })
    fetch("http://localhost:8000/api/login", {
      headers: {
        'X-CSRFToken': pageProps.xcsrfToken,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password
      })
    }).then(res => {
      if (res.status === 200) {
        navigate("/app")
      }
      // TODO: better error handling
    })
  }

  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input placeholder="email" className="input input-bordered" required onChange={(e) => {
            setLoginData({
              ...loginData,
              username: e.target.value
            })
          }}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required onChange={(e) => {
            setLoginData({
              ...loginData,
              password: e.target.value
            })
          }}/>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={() => {
            console.log("LOGIN", loginData)
            performLogin() 
          }}>Login</button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}