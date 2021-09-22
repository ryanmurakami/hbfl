import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.less'
import Favorite from '../../../containers/HamsterFavorite/index.jsx'
import uc from '../../../util/uppercaser.js'

class Card extends React.Component {
  render () {
    return (
      <Link to={`/hamster/${this.props.id}`} className={styles.linkReset}>
        <div className={styles.card}>
          <Favorite
            loggedIn={this.props.loggedIn}
            favorite={this.props.favorite}
            hamster={this.props}
          />
          <img className={styles.img} src={this.props.src} />
          <div className={styles.info}>
            <div className={styles.name}>
              {uc(this.props.name)}
            </div>
            <div className={styles.rank}>
              Rank: {this.props.rank}
            </div>
            {this.props.type &&
              <div className={styles.type}>
                Type: {this.props.type}
              </div>
            }
          </div>
        </div>
      </Link>
    )
  }
}

export default Card
