import React from 'react'
import ListItem from '../ListItem/index.jsx'
import styles from './index.less'

class List extends React.Component {
  constructor (props) {
    super(props)

    // get leaderboards information
    props.fetch()
  }
  render () {
    return (
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Average Points <small>(lower is better)</small></th>
            </tr>
          </thead>
          {this.props.standings &&
            this.props.standings.map(standing => (
              <ListItem
                rank={standing.rank}
                name={standing.name}
                avgPoints={standing.avgPoints}
              />
            ))
          }
        </table>
      </div>
    )
  }
}

export default List
