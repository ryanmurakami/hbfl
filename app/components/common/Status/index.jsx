import React from 'react'
import styles from './index.less'

class Header extends React.Component {
  render () {
    return (
      (this.props.active &&
        <div className={`${styles.status} ${styles[this.props.type]}`}>
          {this.props.message}
        </div>) || <div />
    )
  }
}

export default Header
