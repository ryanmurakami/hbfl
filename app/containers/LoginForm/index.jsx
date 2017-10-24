import { connect } from 'react-redux'
import { doLogin } from '../../actions/user.js'
import Form from '../../components/login/Form/index.jsx'

function mapDispatchToProps (dispatch, ownProps) {
  return {
    submit: (username, password) => {
      dispatch(doLogin(username, password))
    }
  }
}

function mapStateToProps (state) {
  return {
    error: state.user.loginError
  }
}

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form)

export default LoginForm
