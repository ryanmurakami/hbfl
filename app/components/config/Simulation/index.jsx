import React from 'react'
import styles from './index.less'

class Simulation extends React.Component {
  render () {
    return (
      <div>
        <div className={styles.section}>
          <button onClick={this.props.handleStart}>Run Simulation</button>
        </div>
        <div className={styles.section}>
          <button onClick={this.props.handleReset}>Reset Results</button>
        </div>
      </div>
    )
  }
}

export default Simulation
