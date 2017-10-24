import { connect } from 'react-redux'
import Simulation from '../../components/config/Simulation/index.jsx'
import { start, stop, reset } from '../../actions/simulation.js'

function mapStateToProps () {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    start: () => { dispatch(start()) },
    stop: () => { dispatch(stop()) },
    reset: () => { dispatch(reset()) }
  }
}

const Config = connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulation)

export default Config
