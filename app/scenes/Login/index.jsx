import React from 'react'
import Layout from '../../components/common/Layout/index.jsx'
import Form from '../../containers/LoginForm/index.jsx'
import styles from './index.less'

class Login extends React.Component {
  render () {
    return (
      <Layout>
        <div className={styles.login}>
          <div className={styles.title}>Login</div>
          <Form />
        </div>
      </Layout>
    )
  }
}

export default Login
