import React from 'react'
import styles from './index.less'
import Grid from '../../hamsters/Grid/index.jsx'
import uc from '../../../util/uppercaser.js'

class Detail extends React.Component {
  constructor (props) {
    super(props)

    // get user information
    props.fetch()
  }
  render () {
    const user = this.props.user
    const hamsters = user.favorites
      ? user.favorites.map(hamster => Object.assign({}, hamster, { favorite: true }))
      : []

    return (
      <div>
        <div className={styles.name}>
          <span className={styles.nameTitle}>Username:</span> {uc(user.username)}
        </div>
        <div className={styles.favTitle}>Favorites</div>
        <ul>
          {user.favorites &&
            <Grid
              hamsters={hamsters}
              loggedIn={user.loggedIn}
            />
          }
        </ul>
      </div>
    )
  }
}

export default Detail
