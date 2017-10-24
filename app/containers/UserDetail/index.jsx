import sa from 'superagent'
import { connect } from 'react-redux'
import { info } from '../../actions/user'
import Detail from '../../components/user/Detail/index.jsx'

function mapStateToProps (state) {
  return {
    user: state.user
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
      .get('user')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          console.log(res)
          dispatch(info(res))
          resolve(res)
        }
      })
  })
}

const UserDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)

export default UserDetail
