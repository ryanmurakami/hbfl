function races (state = [], action) {
  switch (action.type) {
    case 'RACES.RESET':
      return [...state].map((race) => {
        return Object.assign({}, race, {
          results: null
        })
      })
    default:
      return state
  }
}

export default races
