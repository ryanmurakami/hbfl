import React from 'react'
import Layout from '../../components/common/Layout/index.jsx'
import UserDetail from '../../containers/UserDetail/index.jsx'
import styles from './index.less'

class User extends React.Component {
  render () {
    return (
      <Layout>
        <div className={styles.body}>
          <UserDetail />
        </div>
      </Layout>
    )
  }
}

export default User
