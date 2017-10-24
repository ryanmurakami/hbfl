import React from 'react'
import styles from './index.less'
import ResultsList from '../ResultsList/index.jsx'

class Detail extends React.Component {
  render () {
    const race = this.props.race

    return (
      <div className={styles.detail}>
        <div className={styles.info}>
          <div>
            <span className={styles.infoTitle}>Name:</span> {race.venue}
          </div>
          <div>
            <span className={styles.infoTitle}>Location:</span> {race.city}
          </div>
          <div>
            <span className={styles.infoTitle}>Date:</span> {race.date}
          </div>
        </div>
        <div className={styles.resultsTitle}>
          Race Results
        </div>
        {
          (race.results && <ResultsList race={race} />) ||
          <div className={styles.comingSoon}>Coming soon!</div>
        }
      </div>
    )
  }
}

export default Detail
