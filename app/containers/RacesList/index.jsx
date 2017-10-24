import _ from 'lodash'
import { connect } from 'react-redux'
import List from '../../components/races/List/index.jsx'

function mapStateToProps (state, ownProps) {
  return {
    races: _.slice(state.races, 0, ownProps.length)
  }
}

const RacesList = connect(
  mapStateToProps
)(List)

export default RacesList
