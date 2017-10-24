import { connect } from 'react-redux'
import sa from 'superagent'
import List from '../../components/leaderboards/List/index.jsx'
import { update } from '../../actions/leaderboards.js'

function mapStateToProps (state, ownProps) {
  return {
    standings: state.leaderboards.standings
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetch: () => fetch(dispatch)
  }
}

function fetch (dispatch) {
  return new Promise((resolve, reject) => {
    sa
      .get('leaderboards')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          console.log(res)
          dispatch(update(res))
          resolve(res)
        }
      })
  })
}

const LeaderboardList = connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

export default LeaderboardList
