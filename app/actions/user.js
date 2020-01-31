import sa from 'superagent'
import { push } from 'connected-react-router'

function login () {
  return {
    type: 'LOGIN'
  }
}

function loginResponse (response) {
  return {
    type: 'LOGIN.RESPONSE',
    response
  }
}

function loginFailure () {
  return {
    type: 'LOGIN.FAILURE'
  }
}

function doLogin (username, password) {
  return function (dispatch) {
    dispatch(login())

    return new Promise((resolve, reject) => {
      sa
        .post('login')
        .send({ username, password })
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            console.error(err)
            dispatch(loginFailure())
            reject(err)
          } else {
            dispatch(loginResponse(res))
            dispatch(push('/user'))
            resolve(res)
          }
        })
    })
  }
}

function info (res) {
  return {
    type: 'USER.INFO',
    res
  }
}

export {
  doLogin,
  info
}
