function races (state = [], action) {
  switch (action.type) {
    case 'RACES.RESET':
      const newRaces = [...state].map((race) => {
        return Object.assign({}, race, {
          results: null
        })
      })
      return newRaces
    default:
      return state
  }
}

export default races
