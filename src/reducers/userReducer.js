const user = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOGGEDIN_USER':
      return action.payload
    default:
      return state
  }
}

export default user