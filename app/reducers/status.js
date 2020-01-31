function status (state = [], action) {
  return Object.assign({}, state, {
    active: true,
    message: 'test message',
    type: 'alert'
  })
}

export default status
