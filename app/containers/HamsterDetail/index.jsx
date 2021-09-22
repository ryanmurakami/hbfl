import _ from 'lodash'
import { connect } from 'react-redux'
import Detail from '../../components/hamsters/Detail/index.jsx'

function mapStateToProps (state, ownProps) {
  const hamsterId = ownProps.id
  const hamster = _.find(state.hamsters, hamster => hamster.id === hamsterId)
  const results = (hamster.results && hamster.results.length)
    ? hamster.results.map((result) => {
      const race = _.find(state.races, race => race.id === result.raceId)

      return {
        raceId: result.raceId,
        name: race.venue,
        place: result.place,
        date: race.date
      }
    })
    : []

  return {
    loggedIn: state.user.loggedIn,
    hamster: _.filter(state.hamsters, hamster => hamster.id === hamsterId)[0],
    results
  }
}

const HamsterDetail = connect(
  mapStateToProps
)(Detail)

export default HamsterDetail
