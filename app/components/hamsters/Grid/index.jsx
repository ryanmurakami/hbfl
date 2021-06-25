import React from 'react'
import styles from './index.less'
import Card from '../Card/index.jsx'

class Grid extends React.Component {
  render () {
    return (
      <div className={`${styles.grid} ${this.props.className || ''}`}>
        {
          this.props.hamsters.map((hamster, index) => (
            <Card
              favorite={hamster.favorite}
              id={hamster.id}
              key={index}
              loggedIn={this.props.loggedIn}
              name={hamster.name}
              rank={hamster.rank}
              src={hamster.src}
              type={hamster.type}
            />
          ))
        }
      </div>
    )
  }
}

export default Grid
