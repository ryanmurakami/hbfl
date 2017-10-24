import _ from 'lodash'
import { connect } from 'react-redux'
import Detail from '../../components/races/Detail/index.jsx'

function mapStateToProps (state, ownProps) {
  const raceId = ownProps.id
  let race = _.filter(state.races, race => race.id === raceId)[0]
  let results

  if (race.results) {
    results = race.results.map((result) => {
      const hamster = _.filter(state.hamsters,
        hamster => hamster.id === result.hamsterId)[0]

      return {
        name: hamster.name,
        place: result.place,
        hamsterId: result.hamsterId
      }
    })
  } else {
    results = null
  }

  race = Object.assign({}, race, { results })

  return {
    race
  }
}

const RaceDetail = connect(
  mapStateToProps
)(Detail)

export default RaceDetail
