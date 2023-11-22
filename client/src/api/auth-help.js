import sign from './apiAuth'

const auth = {
  isAuthenticated() {
    if (localStorage.getItem('token'))
      return true
    else
      return false
  },
  clearToken() {
    localStorage.removeItem('token')
    sign.signout();
  },  
}

export default auth
