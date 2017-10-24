import React from 'react'
import Layout from '../../components/common/Layout/index.jsx'
import LeaderboardList from '../../containers/LeaderboardList/index.jsx'
import styles from './index.less'

class Leaderboards extends React.Component {
  render () {
    return (
      <Layout>
        <div className={styles.body}>
          <div className={styles.sectionTitle}>
            Current Leaderboard Standings
          </div>
          <LeaderboardList />
        </div>
      </Layout>
    )
  }
}

export default Leaderboards
