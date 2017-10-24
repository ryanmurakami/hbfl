import { connect } from 'react-redux'
import Status from '../../components/common/Status/index.jsx'

function mapStateToProps (state) {
  const status = state.user.status
  return status
}

const StatusMessage = connect(
  mapStateToProps
)(Status)

export default StatusMessage
