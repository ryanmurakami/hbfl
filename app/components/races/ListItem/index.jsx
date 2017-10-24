import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.less'

class ListItem extends React.Component {
  render () {
    return (
      <Link to={`/race/${this.props.id}`} className={styles.linkReset}>
        <div className={styles.item}>
          <span className={styles.date}>{this.props.date}</span>
          &nbsp;-&nbsp;
          <span className={styles.venue}>{this.props.venue}</span>
          &nbsp;-&nbsp;
          <span className={styles.city}>{this.props.city}</span>
        </div>
      </Link>
    )
  }
}

export default ListItem
