import React from 'react'
import styles from './index.less'
import Card from '../Card/index.jsx'

class Grid extends React.Component {
  render () {
    return (
      <div className={`${styles.grid} ${this.props.className || ''}`}>
        {this.props.hamsters.map((hamster, index) => (
          <Card
            loggedIn={this.props.loggedIn}
            favorite={hamster.favorite}
            key={index}
            id={hamster.id}
            src={hamster.src}
            name={hamster.name}
            rank={hamster.rank}
            type={hamster.type}
          />
      ))}
      </div>
    )
  }
}

export default Grid
