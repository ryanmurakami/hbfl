import React from 'react'
import Layout from '../../components/common/Layout/index.jsx'
import HamsterGrid from '../../containers/HamstersGrid/index.jsx'
import styles from './index.less'

class Hamsters extends React.Component {
  render () {
    return (
      <Layout>
        <div className={styles.body}>
          <div className={styles.sectionTitle}>
            The Hamsters
          </div>
          <HamsterGrid
            className={styles.grid}
          />
        </div>
      </Layout>
    )
  }
}

export default Hamsters
