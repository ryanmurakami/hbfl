function hamsters (state = [], action) {
  switch (action.type) {
    case 'HAMSTERS.RESET':
      const newHamsters = [...state].map((hamster) => {
        return Object.assign({}, hamster, {
          rank: 'N/A',
          results: [],
          totalPoints: 0
        })
      })
      return newHamsters
    default:
      return state
  }
}

export default hamsters
