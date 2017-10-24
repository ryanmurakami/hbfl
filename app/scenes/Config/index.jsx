import React from 'react'
import Layout from '../../components/common/Layout/index.jsx'
import ConfigPanel from '../../containers/ConfigPanel/index.jsx'
import styles from './index.less'

class Config extends React.Component {
  render () {
    return (
      <Layout>
        <div className={styles.body}>
          <div className={styles.sectionTitle}>
            Configuration
          </div>
          <ConfigPanel />
        </div>
      </Layout>
    )
  }
}

export default Config
