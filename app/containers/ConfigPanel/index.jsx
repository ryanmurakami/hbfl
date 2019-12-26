import { connect } from 'react-redux'
import Simulation from '../../components/config/Simulation/index.jsx'
import { reset, start, stop } from '../../actions/simulation.js'

function mapStateToProps () {
  return {}
}

const mapDispatchToProps = {
  reset,
  start,
  stop
}

const Config = connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulation)

export default Config
