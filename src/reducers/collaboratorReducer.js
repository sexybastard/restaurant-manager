const collaborator = (state = [], action) => {
  switch (action.type) {
    case 'INIT_COLLABORATOR':
      return action.payload
    case 'SET_COLLABORATOR':
      return {
        ...state,
        [action.key]: action.payload
      }
    case 'ADD_COLLABORATOR':
      return {
        ...state,
        [action.key]: [...state[action.key], action.payload]
      }
    default:
      return state
  }
}

export default collaborator
