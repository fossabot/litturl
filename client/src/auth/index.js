import router from '../router'
const API = '/api/'
const USER_API = API + 'user/'
const LOGIN_API = USER_API + 'login'

export default {
  user: {
    authenticated: false
  },

  Login (context, creds, redirect) {
    return context.$http.post(LOGIN_API, creds).then(response => {
      localStorage.setItem('id_token', response.body.id_token)
      localStorage.setItem('access_token', response.body.access_token)
      this.user.authenticated = true

      if (redirect) {
        router.push(redirect)
      }
    }, response => {
      return response.body
    }).catch(e => {
      return e.message
    })
  },
  isAuthenticated () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      return true
    }
    return false
  },

  getAuthHeader () {
    console.log(localStorage.getItem('access_token'))
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  },

  Logout () {
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
  }

}
