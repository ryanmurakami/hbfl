import React from 'react'
import styles from './index.less'
import { Link } from 'react-router-dom'

class ResultsList extends React.Component {
  render () {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Placing</th>
            <th>Race Name</th>
            <th>Race Date</th>
          </tr>
        </thead>
        {this.props.results.map((result) => {
          return (
            <tr className={styles.row}>
              <td>{result.place}</td>
              <td>
                <Link to={`/race/${result.raceId}`}>
                  {result.name}
                </Link>
              </td>
              <td>{result.date}</td>
            </tr>
          )
        })}
      </table>
    )
  }
}

export default ResultsList
