import React from 'react'
import styles from './index.less'

class Simulation extends React.Component {
  render () {
    return (
      <div>
        <div className={styles.section}>
          <button onClick={this.props.start}>Run Simulation</button>
        </div>
        <div className={styles.section}>
          <button onClick={this.props.reset}>Reset Results</button>
        </div>
      </div>
    )
  }
}

export default Simulation
