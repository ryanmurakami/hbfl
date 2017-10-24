import React from 'react'
import styles from './index.less'
import uc from '../../../util/uppercaser.js'

class ListItem extends React.Component {
  render () {
    return (
      <tr className={styles.row}>
        <td className={styles.rank}>{this.props.rank}</td>
        <td className={styles.name}>{uc(this.props.name)}</td>
        <td className={styles.points}>{this.props.avgPoints.toFixed(2)}</td>
      </tr>
    )
  }
}

export default ListItem
