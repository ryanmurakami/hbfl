import { connect } from 'react-redux'
import Simulation from '../../components/config/Simulation/index.jsx'
import { reset, start, stop } from '../../actions/simulation.js'

function mapStateToProps () {
  return {}
}

const mapDispatchToProps = {
  handleReset: reset,
  handleStart: start,
  handleStop: stop
}

const Config = connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulation)

export default Config
