import { connect } from 'react-redux'
import { doFavorite, doUnfavorite } from '../../actions/hamsters.js'
import Favorite from '../../components/hamsters/Favorite/index.jsx'

function mapStateToProps (state, ownProps) {
  return ownProps
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    onClick (e) {
      e.stopPropagation()
      e.preventDefault()
      if (ownProps.favorite) {
        dispatch(doUnfavorite(ownProps.hamster))
      } else {
        dispatch(doFavorite(ownProps.hamster))
      }
    }
  }
}

const HamsterFavorite = connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorite)

export default HamsterFavorite
