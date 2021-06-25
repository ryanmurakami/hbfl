function hamsters (state = [], action) {
  switch (action.type) {
    case 'HAMSTERS.RESET':
      return [...state].map((hamster) => {
        return Object.assign({}, hamster, {
          rank: 'N/A',
          results: [],
          totalPoints: 0
        })
      })
    default:
      return state
  }
}

export default hamsters
