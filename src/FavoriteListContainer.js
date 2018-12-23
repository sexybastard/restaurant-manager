import { connect } from 'react-redux'
import { setFavorites, setCollaborator } from './actions'
import FavoriteList from './FavoriteList'

const mapStateToProps = (state, ownProps) => ({
  user: state.loggedinUser,
  favorites: state.favorites
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFavorites: (payload) => dispatch(setFavorites(payload)),
  setCollaborator: (key, payload) => dispatch(setCollaborator(key, payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteList)