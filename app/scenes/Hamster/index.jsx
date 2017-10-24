import React from 'react'
import Layout from '../../components/common/Layout/index.jsx'
import HamsterDetail from '../../containers/HamsterDetail/index.jsx'
import styles from './index.less'

class Hamster extends React.Component {
  render () {
    return (
      <Layout>
        <div className={styles.body}>
          <div className={styles.sectionTitle}>
            Hamster Details
          </div>
          <HamsterDetail id={+this.props.match.params.id} />
        </div>
      </Layout>
    )
  }
}

export default Hamster
