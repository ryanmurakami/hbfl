import _ from 'lodash'
import { connect } from 'react-redux'
import Grid from '../../components/hamsters/Grid/index.jsx'

function mapStateToProps (state, ownProps) {
  let hamsters = _.slice(state.hamsters, 0, ownProps.length)

  if (state.user.favorites) {
    hamsters = hamsters.map((hamster) => {
      return Object.assign({}, hamster, {
        favorite: !!_.find(state.user.favorites, favorite => favorite.id === hamster.id)
      })
    })
  }

  return {
    loggedIn: state.user.loggedIn,
    hamsters,
    className: ownProps.className
  }
}

const HamstersGrid = connect(
  mapStateToProps
)(Grid)

export default HamstersGrid
