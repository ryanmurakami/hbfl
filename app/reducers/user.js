import _ from 'lodash'

const initialState = {
  favorites: [],
  user: {}
}

function user (state = initialState, action) {
  // clear status when something happens
  state = Object.assign({}, state, {
    status: null
  })

  switch (action.type) {
    case 'USER.UPDATE.USERNAME':
      return Object.assign({}, state, {
        loginAttempt: Object.assign({}, state.user.loginAttempt, {
          username: action.username
        })
      })
    case 'USER.UPDATE.PASSWORD':
      return Object.assign({}, state, {
        loginAttempt: Object.assign({}, state.user.loginAttempt, {
          password: action.password
        })
      })
    case 'LOGIN':
      return state
    case 'LOGIN.FAILURE':
      return Object.assign({}, state, {
        loggedIn: false,
        loginError: true
      })
    case 'LOGIN.RESPONSE':
      return Object.assign({}, state, {
        loggedIn: true,
        loginError: false,
        username: action.response.body.username,
        id: action.response.body.id
      })
    case 'USER.INFO':
      return Object.assign({}, state, {
        favorites: action.res.body.favorites
      })
    case 'USER.FAVORITE':
      if (state.favorites.length >= 3) {
        return Object.assign({}, state, {
          status: {
            active: true,
            type: 'alert',
            message: 'Cannot add more than three favorites'
          }
        })
      }
      return Object.assign({}, state, {
        favorites: state.favorites
          ? [action.hamster, ...state.favorites]
          : [action.hamster]
      })
    case 'USER.UNFAVORITE':
      const newFavorites = _.filter(
        [...state.favorites],
        fav => fav.id !== action.hamster.id)

      return Object.assign({}, state, {
        favorites: newFavorites
      })
    default:
      return state
  }
}

export default user
