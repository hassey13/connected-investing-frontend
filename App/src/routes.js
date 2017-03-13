import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './App'
import Home from './components/profile/Home'
import Profile from './components/profile/Profile'
import LogIn from './components/sessions/LogIn'
import SignUp from './components/sessions/SignUp'
import Edit from './components/profile/Edit'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Home } onEnter={ requireAuth }/>
    <Route path='/edit' component={ Edit } />
    <Route path={'/profile/:username'} component={ Profile } onEnter={ requireAuth } />
    <Route path='/login' component={ LogIn }/>
    <Route path='/signup' component={ SignUp }/>
  </Route>
)

function requireAuth(nextState, replace) {
  if (!sessionStorage.jwt) replace({ pathname: '/login' })
}
