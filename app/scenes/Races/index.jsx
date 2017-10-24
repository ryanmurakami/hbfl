import React from 'react'
import Layout from '../../components/common/Layout/index.jsx'
import RacesList from '../../containers/RacesList/index.jsx'
import styles from './index.less'

class Races extends React.Component {
  render () {
    return (
      <Layout>
        <div className={styles.body}>
          <div className={styles.sectionTitle}>
            The Races
          </div>
          <RacesList />
        </div>
      </Layout>
    )
  }
}

export default Races
