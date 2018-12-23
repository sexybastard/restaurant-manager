export const setLoggedinUser = payload => ({
  type: 'SET_LOGGEDIN_USER',
  payload
})

export const setRestaurants = payload => ({
  type: 'SET_RESTAURANTS',
  payload
})

export const setFavorites = payload => ({
  type: 'SET_FAVORITES',
  payload
})

export const initCollaborator = (payload) => ({
  type: 'INIT_COLLABORATOR',
  payload
})

export const setCollaborator = (key, payload) => ({
  type: 'SET_COLLABORATOR',
  key,
  payload
})


export const addCollaborator = (key, payload) => ({
  type: 'ADD_COLLABORATOR',
  key,
  payload
})
