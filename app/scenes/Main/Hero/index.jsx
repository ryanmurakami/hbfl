import React from 'react'
import styles from './index.less'
import assets from '../../../../util/assets'

class Hero extends React.Component {
  render () {
    return (
      <div>
        <div className={styles.hero}>
          <div className={styles.mainball}>
            <img
              src={assets.main_ball}
              alt='main ball'
            />
          </div>
          <div className={styles.title}>
            Hamster Ball Fantasy League
          </div>
          <div className={styles.tagline}>
            The ONLY place on the web to follow the Hamster Ball League
          </div>
        </div>
      </div>
    )
  }
}

export default Hero
