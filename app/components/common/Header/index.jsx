import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../../../containers/LoginHeader/index.jsx'
import styles from './index.less'

class Header extends React.Component {
  render () {
    return (
      <header className={styles.header}>
        <div className={styles.colorBlocks}>
          <div className={styles.yellow} />
          <div className={styles.orange} />
          <div className={styles.pink} />
        </div>
        <div className={styles.title}>
          <Link to='/'>HBFL</Link>
        </div>
        <div className={styles.menu}>
          <div><Link to='/races'>Races</Link></div>
          <div><Link to='/hamsters'>Hamsters</Link></div>
          <div><Link to='/leaderboards'>Leaderboards</Link></div>
        </div>
        <div className={styles.login}>
          <Login />
        </div>
      </header>
    )
  }
}

export default Header
