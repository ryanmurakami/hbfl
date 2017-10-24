import React from 'react'
import styles from './index.less'
import assets from '../../../../util/assets'

class Favorite extends React.Component {
  render () {
    return (
      <div className={styles.fav} onClick={this.props.onClick}>
        {this.props.loggedIn &&
          ((this.props.favorite &&
          <img src={assets.heart_active} />) ||
          <img src={assets.heart_inactive} />)
        }
      </div>
    )
  }
}

export default Favorite
