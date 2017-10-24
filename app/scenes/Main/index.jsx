import React from 'react'
import Layout from '../../components/common/Layout/index.jsx'
import Hero from './Hero/index.jsx'
import HamsterGrid from '../../containers/HamstersGrid/index.jsx'
import RacesList from '../../containers/RacesList/index.jsx'
import styles from './index.less'

class Main extends React.Component {
  render () {
    return (
      <div>
        <Layout className='main'>
          <Hero />
          <div className={styles.body}>
            <div className={styles.sectionTitle}>
              Featured Hamsters
            </div>
            <HamsterGrid
              length={3}
            />
            <div className={styles.sectionTitle}>
              Upcoming Races
            </div>
            <RacesList
              length={3}
            />
          </div>
        </Layout>
      </div>
    )
  }
}

export default Main
