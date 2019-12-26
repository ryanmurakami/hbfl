import sa from 'superagent'

function hamstersReset () {
  return {
    type: 'HAMSTERS.RESET'
  }
}

function racesReset () {
  return {
    type: 'RACES.RESET'
  }
}

function stop () {
  return function (dispatch) {
    return new Promise((resolve) => {
      console.log('Stopping Simulation')
      sa
        .post('/simulation/stop')
        .end(resolve)
    })
  }
}

function reset () {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      console.log('Resetting Results')
      sa
        .post('/simulation/reset')
        .end(() => {
          dispatch(hamstersReset())
          dispatch(racesReset())
        })
    })
  }
}

function start () {
  return function (dispatch) {
    console.log('Starting Simulation')
    sa
      .post('/simulation/start')
      .timeout({
        response: 90000
      })
      .end()
  }
}

export {
  reset,
  start,
  stop
}
