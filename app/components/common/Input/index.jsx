import React from 'react'
import styles from './index.less'

function upperCase (word) {
  return word.substring(0, 1).toUpperCase() + word.substring(1)
}

function validType (type) {
  return type.match(/email|password|date|checkbox|file|radio|tel/)
}

class Input extends React.Component {
  render () {
    return (
      <input
        autoFocus={this.props.autofocus}
        className={`${styles.input} ${this.props.className}`}
        placeholder={upperCase(this.props.for)}
        value={this.props.value}
        type={validType(this.props.for) ? this.props.for : 'text'}
        onChange={this.props.onChange}
        onKeyPress={this.props.onKeyPress}
      />
    )
  }
}

export default Input
