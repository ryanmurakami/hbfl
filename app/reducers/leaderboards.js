function races (state = [], action) {
  switch (action.type) {
    case 'LEADERBOARDS.UPDATE':
      return Object.assign({}, state, {
        standings: action.res.body
      })
    default:
      return state
  }
}

export default races
