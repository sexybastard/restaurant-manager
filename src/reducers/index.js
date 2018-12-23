import { combineReducers } from 'redux'

import loggedinUser from './userReducer'
import restaurants from './restaurantReducer'
import favorites from './favoriteReducer'
import collaborators from './collaboratorReducer'

export default combineReducers({
  loggedinUser,
  restaurants,
  favorites,
  collaborators
})