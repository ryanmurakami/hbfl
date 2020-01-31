import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.less'
import uc from '../../../util/uppercaser.js'
import assets from '../../../../util/assets'

class Login extends React.Component {
  static defaultProps = {
    user: {}
  }

  render () {
    return (
      this.props.user.loggedIn
        ? <div className={styles.container}>
          <div className={styles.config}>
            <Link to='/config'>
              <img src={assets.settings} />
            </Link>
          </div>
          <div className={styles.link}>
            <Link to='/user'>{uc(this.props.user.username)}</Link>
          </div>
        </div>
        : <div className={styles.container}>
          <div className={styles.link}>
            <Link to='/login'>Login</Link>
          </div>
        </div>
    )
  }
}

export default Login
