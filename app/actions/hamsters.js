import sa from 'superagent'

function favorite (hamster) {
  return {
    type: 'USER.FAVORITE',
    hamster
  }
}

function unfavorite (hamster) {
  return {
    type: 'USER.UNFAVORITE',
    hamster
  }
}

function doFavorite (hamster) {
  return function (dispatch) {
    dispatch(favorite(hamster))

    return new Promise((resolve, reject) => {
      sa
        .post(`favorite/${hamster.id}`)
        .end((err, res) => {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            resolve(res)
          }
        })
    })
  }
}

function doUnfavorite (hamster) {
  return function (dispatch) {
    dispatch(unfavorite(hamster))

    return new Promise((resolve, reject) => {
      sa
        .delete(`favorite/${hamster.id}`)
        .end((err, res) => {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            resolve(res)
          }
        })
    })
  }
}

export {
  doFavorite,
  doUnfavorite
}
