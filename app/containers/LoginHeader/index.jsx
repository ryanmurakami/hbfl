import { connect } from 'react-redux'
import Login from '../../components/common/Login/index.jsx'

function mapStateToProps (state, ownProps) {
  return {
    user: state.user
  }
}

const LoginHeader = connect(
  mapStateToProps
)(Login)

export default LoginHeader
