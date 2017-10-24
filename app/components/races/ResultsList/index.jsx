import React from 'react'
import styles from './index.less'
import { Link } from 'react-router-dom'
import uc from '../../../util/uppercaser.js'

class ResultsList extends React.Component {
  render () {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Placing</th>
            <th>Hamster Name</th>
          </tr>
        </thead>
        {this.props.race.results.map((result) => {
          return (
            <tr className={styles.row}>
              <td>{result.place}</td>
              <td>
                <Link to={`/hamster/${result.hamsterId}`}>
                  {uc(result.name)}
                </Link>
              </td>
            </tr>
          )
        })}
      </table>
    )
  }
}

export default ResultsList
