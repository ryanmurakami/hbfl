import React from 'react'
import ListItem from '../ListItem/index.jsx'
import styles from './index.less'

class List extends React.Component {
  render () {
    const races = this.props.races.sort((a, b) => {
      if (a.date < b.date) {
        return -1
      }
      if (a.date > b.date) {
        return 1
      }
      return 0
    })

    return (
      <div className={`${styles.list} ${this.props.className || ''}`}>
        {races.map((race, index) => (
          <ListItem
            key={index}
            id={race.id}
            date={race.date}
            venue={race.venue}
            city={race.city}
          />
        ))}
      </div>
    )
  }
}

export default List
