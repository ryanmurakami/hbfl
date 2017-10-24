import React from 'react'
import styles from './index.less'
import ResultsList from '../ResultsList/index.jsx'
import uc from '../../../util/uppercaser.js'

class Detail extends React.Component {
  render () {
    const hamster = this.props.hamster

    return (
      <div className={styles.detail}>
        <div className={styles.info}>
          <div>
            <span className={styles.infoTitle}>Name:</span> {uc(hamster.name)}
          </div>
          <div>
            <span className={styles.infoTitle}>Rank:</span> {hamster.rank}
          </div>
          <div>
            <span className={styles.infoTitle}>Type:</span> {hamster.type}
          </div>
          <div className={styles.pic}>
            <img src={hamster.src} />
          </div>
        </div>
        <div className={styles.resultsTitle}>
          Race Results
        </div>
        {
          (this.props.results &&
            this.props.results.length &&
            <ResultsList results={this.props.results} />) ||
            <div className={styles.comingSoon}>No races yet!</div>
        }
      </div>
    )
  }
}

export default Detail
