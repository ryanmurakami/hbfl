import React from 'react'
import Header from '../Header/index.jsx'
import Footer from '../Footer/index.jsx'
import StatusMessage from '../../../containers/StatusMessage/index.jsx'

class Layout extends React.Component {
  render () {
    return (
      <div className={this.props.className}>
        <Header />
        <StatusMessage />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Layout
