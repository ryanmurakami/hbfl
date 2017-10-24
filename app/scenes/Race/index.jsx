import React from 'react'
import Layout from '../../components/common/Layout/index.jsx'
import RaceDetail from '../../containers/RaceDetail/index.jsx'
import styles from './index.less'

class Race extends React.Component {
  render () {
    return (
      <Layout>
        <div className={styles.body}>
          <div className={styles.sectionTitle}>
            Race Details
          </div>
          <RaceDetail id={+this.props.match.params.id} />
        </div>
      </Layout>
    )
  }
}

export default Race
